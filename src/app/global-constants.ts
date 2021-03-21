import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";


@Injectable()
export class GlobalConstants {
    public REST_API_IP = "192.168.1.215";
    public REST_API_SERVER = "https://" + this.REST_API_IP + ":5000/api/system";
    public APPS_AVAILABLE_SINGULAR = [];
    public APPS_AVAILABLE_MULTIPLE = [];
    public errorActive = false;
}