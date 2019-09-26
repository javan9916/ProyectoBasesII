import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {LoginService} from "./login.service";

export class LoginDataSource {

    constructor(private service: LoginService) { }

    //LLama al servicio de Login
    Login(){
        this.service.doLogin(this.service.formLogin.value).subscribe();
    }
}