import { Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";


@Injectable()
export class GlobalConstants {
    public REST_API_IP = "127.0.0.1";
    public REST_API_PORT = "";
    public REST_API_SERVER = "http://" + this.REST_API_IP + ":" + this.REST_API_PORT + "/api/system";
    public APPS_AVAILABLE_SINGULAR = [];
    public APPS_AVAILABLE_MULTIPLE = [];
    public APPS_ALLOWED_APPS: any;
    public LOADING = true;
    public errorActive = false;


}