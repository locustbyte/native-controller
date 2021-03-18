import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  REST_API_IP = "207.180.244.152";
  REST_API_SERVER = "https://" + this.REST_API_IP + ":5000/api/system";
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private httpClient: HttpClient) { }

  public getAppsRunning() {
    return this.httpClient.get(this.REST_API_SERVER + "/apps/running/");
  }
  public getSnapshot(id) {

    return this.httpClient.get<any>(this.REST_API_SERVER + "/apps/running/" + id + "/screen", { observe: 'response' }).pipe(
      map((result: HttpResponse<Blob>) => {
        console.log(result);
        // return result;
      }));

    return this.httpClient.get<any>(this.REST_API_SERVER + "/apps/running/" + id + "/screen");
  }

  public getSpecificAppDetail(app) {
    console.log(app.appID)
    return this.httpClient.get(this.REST_API_SERVER + "/apps/running/" + app.appID + "?windowId=0");
  }

  public executeCommand(data: any): Observable<any> {
    //var theURL = "http://207.180.244.152:5000/api/System/application/2944/shortcuts?windowId=4589428&commandName=Raise"
    var theURL = this.REST_API_SERVER + "/application/" + data.appID + "/shortcuts?windowId=" + data.windowsID + "&commandName=" + data.appCommand
    return from(
      fetch(
        theURL, // the url you are trying to access
        {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST', // GET, POST, PUT, DELETE
          mode: 'no-cors' // the most important option
        }
      ));
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