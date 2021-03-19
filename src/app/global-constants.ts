import { Injectable } from "@angular/core";


@Injectable()
export class GlobalConstants {
    public REST_API_IP: string = "207.180.244.152";
    public REST_API_SERVER = "https://" + this.REST_API_IP + ":5000/api/system";
    public errorActive = false;
}