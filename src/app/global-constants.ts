import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";


@Injectable()
export class GlobalConstants {
    public REST_API_IP = "192.168.1.215";
    public REST_API_SERVER = "https://" + this.REST_API_IP + ":5000/api/system";
    public errorActive = false;
}