import { GlobalConstants } from './../global-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CurrentIpPortService } from "../services/current-ip-port.service";
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  theApiServer: string;
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
  constructor(public currentIPPORT: CurrentIpPortService, private httpClient: HttpClient, public globals: GlobalConstants) {
    if (localStorage.getItem("currentIpAddress")) {
      this.globals.REST_API_IP = localStorage.getItem("currentIpAddress")
    }
    if (localStorage.getItem("currentPortAddress")) {
      this.globals.REST_API_PORT = localStorage.getItem("currentPortAddress")
    }
    this.globals.REST_API_SERVER = "http://" + this.globals.REST_API_IP + ":" + this.globals.REST_API_PORT + "/api/system";
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  // Get all applications running on host
  public getAppsRunning() {
    this.currentIPPORT.setValue({ "active": false });
    this.globals.API_CURRENT_PATH = "/apps/running/"
    return this.httpClient.get<any>(this.globals.REST_API_SERVER + this.globals.API_CURRENT_PATH).pipe(
      // catchError(this.handleError)
    );
  }
  // Set focus to app window
  public doSetWindowFocus(data) {
    this.globals.API_CURRENT_PATH = "/apps/running/" + data.appID + "/" + data.windowsID
    var theURL = this.globals.REST_API_SERVER + this.globals.API_CURRENT_PATH
    const body = { title: 'Angular PUT Request Example' };
    return this.httpClient.put<any>(theURL, body)
  }
  // Execute application command 
  public executeCommand(data: any): Observable<any> {
    this.globals.API_CURRENT_PATH = "/application/" + data.appID + "/shortcuts?windowId=" + data.windowsID + "&commandName=" + data.appCommand
    var theURL = this.globals.REST_API_SERVER + this.globals.API_CURRENT_PATH
    var body = {}
    return this.httpClient.post<any>(theURL, body)
  }
}