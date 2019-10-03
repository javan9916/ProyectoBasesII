import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {DatabaseService} from "./database.service";
import {LoginService} from "../login/login.service";
import { DiskInter } from 'src/app/modals/disk-inter';


export class diskSourceDatabase implements DataSource<DiskInter>{
    

    private subjectDisk = new BehaviorSubject<DiskInter[]>([]);
    constructor(
        private dbService: DatabaseService,
        private loginService: LoginService,) {
    }

    connect(collectionViewer: CollectionViewer): Observable<DiskInter[]> {
        return this.subjectDisk.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.subjectDisk.complete();
    }

    //LLama al servicio de GetDB
    consultarDiscos(currentDB) {
        this.dbService.ShowDisks(
          currentDB,
          this.loginService.formLogin.value).subscribe((res) => {
            this.subjectDisk.next(res['content'])
        });
        console.log(currentDB);
      }
}