import { Injectable, OnInit } from "@angular/core";
@Injectable()
export class GlobalConstants {
    public REST_API_IP = "127.0.0.1";
    public REST_API_PORT = "";
    public REST_API_SERVER = "http://" + this.REST_API_IP + ":" + this.REST_API_PORT + "/api/system";
    public APPS_AVAILABLE_SINGULAR = [];
    public APPS_AVAILABLE_MULTIPLE = [];
    public APP_CURRENTLY_VIEWING = {};
    public APPS_ALLOWED_APPS: any;
    public CURRENT_MODAL: any;
    public API_DELAY_CALL = false;
    public API_CURRENT_PATH = "/apps/running/";
    public API_ERROR = [];
    public API_MODE = "LoadData";
    public API_ERROR_TYPE = null;
    public LOADING = true;
    public LOADINGDATA = false;
    public errorActive = false;
}