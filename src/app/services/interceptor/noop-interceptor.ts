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
                if (currReqPath.includes('commandName=Leave')) {
                    this.globals.API_DELAY_CALL = true;
                    // Close modal and call api for fresh app list
                    this.modalController.dismiss({ 'dismissed': 'leaveTeamsCall' })
                }
                if (event instanceof HttpResponse) {
                    this.globals.API_ERROR = false;
                    this.globals.API_ERROR_TYPE = null;
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                console.log(error.url)
                if (error.url.indexOf(this.globals.REST_API_SERVER + this.globals.API_CURRENT_PATH) !== -1) {
                    console.log('true')
                    this.globals.LOADING = false;
                    this.globals.API_ERROR = true;
                    this.globals.API_ERROR_TYPE = 'NOAPI';
                }
                if (error.url.indexOf(this.globals.API_CURRENT_PATH) !== -1) {
                    if (this.globals.API_CURRENT_PATH) {
                        if (this.globals.API_CURRENT_PATH == '/apps/running/') {
                            this.globals.LOADING = false;
                            this.globals.API_ERROR = true;
                            this.globals.API_ERROR_TYPE = 'NOAPI';
                        }
                    }

                }
                // this.globals.API_ERROR = true;
                // this.globals.API_ERROR_TYPE = error.status;
                return throwError(error);
            }));
    }
}