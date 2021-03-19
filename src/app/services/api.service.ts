import { GlobalConstants } from './../global-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private httpClient: HttpClient, public globals: GlobalConstants) {

  }


  public getAppsRunning() {
    // this.globals.REST_API_IP = '127.0.0.1';
    this.globals.REST_API_SERVER = "https://" + this.globals.REST_API_IP + ":5000/api/system";
    return this.httpClient.get(this.globals.REST_API_SERVER + "/apps/running/");
  }
  public getSnapshot(id) {

    return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/" + id + "/screen", { observe: 'response' }).pipe(
      map((result: HttpResponse<Blob>) => {
        console.log(result);
        // return result;
      }));

    return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/" + id + "/screen");
  }

  // Set focus to app window
  public doSetWindowFocus(data) {
    var putData
    console.log(data)
    return this.httpClient
      .get("data-url")
      .subscribe(
        data => console.log('success', data),
        error => console.log('oops', error)
      );
    return this.httpClient.put(this.globals.REST_API_SERVER + "/apps/running/" + data.appID + "/" + data.windowsID, putData)
  }

  public getSpecificAppDetail(app) {
    return this.httpClient.get(this.globals.REST_API_SERVER + "/apps/running/" + app.appID + "?windowId=" + app.windowsID)
  }

  public executeCommand(data: any): Observable<any> {
    //var theURL = "http://207.180.244.152:5000/api/System/application/2944/shortcuts?windowId=4589428&commandName=Raise"
    var theURL = this.globals.REST_API_SERVER + "/application/" + data.appID + "/shortcuts?windowId=" + data.windowsID + "&commandName=" + data.appCommand
    return from(
      fetch(theURL, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST', // GET, POST, PUT, DELETE
        mode: 'no-cors' // the most important option
      })
        .then(function () {
          console.log("No API problems");
        }).catch(function () {
          console.log("error");
        })
    )
    // return from(
    //   fetch(
    //     theURL, // the url you are trying to access
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       method: 'POST', // GET, POST, PUT, DELETE
    //       mode: 'no-cors' // the most important option
    //     }
    //   ));
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'my-auth-token'
    //   })
    // };
    // console.log(data)
    // var theURL = "/application/" + data.appID + "/shortcuts?windowId=" + data.windowsID + "&commandName=Raise"
    // return this.httpClient.post<any>(this.REST_API_SERVER + theURL, data, httpOptions);
  }
}