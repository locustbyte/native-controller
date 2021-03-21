import { GlobalConstants } from './../global-constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders(
      {
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",

        "content-type": "application/json; charset=utf-8"
      }
    )
  };

  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private httpClient: HttpClient, public globals: GlobalConstants) {

  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  public getAppsRunning() {
    //return this.httpClient.get(this.globals.REST_API_SERVER + "/apps/running/")
    //return this.httpClient.get<any>("/api/apps/running")

    //var theURL = this.globals.REST_API_SERVER + "/apps/running"
    // return this.httpClient.get(theURL).pipe(
    //   tap(_ => console.log('updated hero id=')),
    //   catchError(this.handleError<any>('updateHero'))
    // );
    // this.globals.REST_API_IP = '127.0.0.1';
    //this.globals.REST_API_SERVER = "http://" + this.globals.REST_API_IP + ":5000/api/system";
    return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/");
  }

  public getSnapshot(param) {
    alert(param)
    return this.httpClient.get(this.globals.REST_API_SERVER + "/apps/running/" + param.appID + "/screen?windowId=" + param.windowsID).pipe(
      map((result: HttpResponse<Blob>) => {
        console.log(result);

      }));

  }
  // public getSnapshot(param): Observable<Blob> {
  //   alert('sss')
  //   return this.httpClient
  //     .get(this.globals.REST_API_SERVER + "/apps/running/" + param.appID + "/screen?windowId=" + param.windowsID, {
  //       responseType: "blob"
  //     });
  // }
  // public getSnapshot(param) {
  //   console.log(param)

  //   //return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/" + param.appID + "/screen?windowId=" + param.windowsID)
  //   return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/" + param.appID + "/screen?windowId=" + param.windowsID, { observe: 'response' }).pipe(
  //     map((result: HttpResponse<Blob>) => {
  //       console.log(result);
  //       saveAs(result, "Quotation.pdf");
  //       return result;
  //     }));
  //   return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/" + param.appID + "/screen?windowId=" + param.windowsID, { observe: 'response', responseType: 'blob' as 'json' });
  // }

  // Set focus to app window
  public doSetWindowFocus(data) {
    var theURL = this.globals.REST_API_SERVER + "/apps/running/" + data.appID + "/" + data.windowsID
    const headers = { 'Access-Control-Allow-Origin': '*', 'My-Custom-Header': 'foobar' };
    const body = { title: 'Angular PUT Request Example' };
    return this.httpClient.put<any>(theURL, body, { headers }).pipe(
      map((result: HttpResponse<Blob>) => {
        console.log(result)
      })
    )


    // var theURL = this.globals.REST_API_SERVER + "/apps/running/" + data.appID + "/" + data.windowsID
    // // return this.httpClient.put(theURL, data).pipe(
    // //   tap(_ => console.log('updated hero id=')),
    // //   catchError(this.handleError<any>('updateHero'))
    // // );
    // var putData
    // // console.log(data)
    // // return this.httpClient
    // //   .get("data-url")
    // //   .subscribe(
    // //     data => console.log('success', data),
    // //     error => console.log('oops', error)
    // //   );
    // // return from(
    // //   fetch(theURL, {
    // //     headers: {
    // //       'Content-Type': 'application/json',
    // //     },
    // //     method: 'PUT', // GET, POST, PUT, DELETE
    // //     mode: 'no-cors' // the most important option
    // //   })
    // //     .then(function () {
    // //       console.log("No API problems");
    // //     }).catch(function () {
    // //       console.log("error");
    // //     })
    // )
    //return this.httpClient.put(this.globals.REST_API_SERVER + "/apps/running/" + data.appID + "/" + data.windowsID, putData)
  }

  public getSpecificAppDetail(app) {
    return this.httpClient.get<any>(this.globals.REST_API_SERVER + "/apps/running/" + app.appID + "?windowId=" + app.windowsID)
  }

  public executeCommand(data: any): Observable<any> {
    console.log(data)
    //var theURL = "http://207.180.244.152:5000/api/System/application/2944/shortcuts?windowId=4589428&commandName=Raise"
    var theURL = this.globals.REST_API_SERVER + "/application/" + data.appID + "/shortcuts?windowId=" + data.windowsID + "&commandName=" + data.appCommand

    //var postData = { "processID": 343 }
    //return this.httpClient.post<any>(theURL, postData);

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
    //return this.httpClient.post<any>(this.globals.REST_API_SERVER + theURL, data);
  }
}