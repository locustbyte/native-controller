import { Injectable } from '@angular/core';
// import { ErrorDialogService } from './errordialog.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { GlobalConstants } from '../../global-constants';
import { CleandataService } from "../../services/cleandata.service";
import { ModalController } from '@ionic/angular';
import { CurrentIpPortService } from "../../services/current-ip-port.service";
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private currentIPPORT: CurrentIpPortService, public modalController: ModalController, private cleanData: CleandataService, private globals: GlobalConstants) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token: string = localStorage.getItem('token');
        //
        request = request.clone({ headers: request.headers.set('withCredentials', 'true' + token) });
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                var currReqPath = request.url;
                this.globals.API_ERROR = [{
                    "active": false,
                    "type": "API"
                }]
                if (currReqPath.includes('commandName=Leave')) {
                    this.globals.API_DELAY_CALL = true;
                    // Close modal and call api for fresh app list
                    this.modalController.dismiss({ 'dismissed': 'leaveTeamsCall' })
                }
                if (event instanceof HttpResponse) {
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                this.currentIPPORT.subscription = this.currentIPPORT.getAsyncData().subscribe(u => (this.globals.REST_API_IP = u.currIP));
                this.currentIPPORT.subscription = this.currentIPPORT.getAsyncData().subscribe(u => (this.globals.REST_API_PORT = u.currPORT));


                if (new String("http://" + this.globals.REST_API_IP + "/api/system/apps/running/").valueOf() == new String("http://" + this.globals.REST_API_IP + "/api/system/apps/running/").valueOf()) {
                    if (error.statusText == 'Unknown Error') {
                        this.globals.API_ERROR = [{
                            "active": true,
                            "type": "NOCONNECT"
                        }]
                        this.currentIPPORT.setValue({ "active": true });
                        this.currentIPPORT.subscriptionApiError = this.currentIPPORT.checkIfApiError(this.globals.API_ERROR).subscribe(u => u);
                        this.globals.LOADING = false;
                    }
                    if (error.statusText == 'Not Found') {
                        this.globals.API_ERROR = [{
                            "active": true,
                            "type": "NOTFOUND"
                        }]
                        this.currentIPPORT.setValue({ "active": true });
                        this.currentIPPORT.subscriptionApiError = this.currentIPPORT.checkIfApiError(this.globals.API_ERROR).subscribe(u => u);
                        this.globals.LOADING = false;
                    }




                }
                if (error.url) {
                    if (new String("http://" + this.globals.REST_API_IP + "/api/system/apps/running/").valueOf() == new String("http://null/api/system/apps/running/").valueOf()) {
                        this.globals.API_ERROR = [{
                            "active": true,
                            "type": "GETSERVER"
                        }]
                        this.currentIPPORT.setValue({ "active": true });
                        this.currentIPPORT.subscriptionApiError = this.currentIPPORT.checkIfApiError(this.globals.API_ERROR).subscribe(u => u);
                        this.globals.LOADING = false;
                    }
                }
                // this.globals.API_ERROR = true;
                // this.globals.API_ERROR_TYPE = error.status;
                return throwError(error);
            }));
    }
}