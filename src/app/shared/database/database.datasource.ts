import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {DatabaseService} from "./database.service";
import {LoginService} from "../login/login.service";
import {DatabaseInter} from "../../modals/databases-inter"


export class dataSourceDatabase implements DataSource<DatabaseInter>{
    

    private subjectDataBases = new BehaviorSubject<DatabaseInter[]>([]);
    constructor(private service: DatabaseService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<DatabaseInter[]> {
        return this.subjectDataBases.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.subjectDataBases.complete();
    }

    //LLama al servicio de GetDB
    getDB(dataLogin){
        this.service.getDataBases(dataLogin).subscribe(data => {
            this.subjectDataBases.next(data['content'])
        });
    }

    addDB(data, dataLogin){
        this.service.addDatabase(data, dataLogin).subscribe();
    }



}