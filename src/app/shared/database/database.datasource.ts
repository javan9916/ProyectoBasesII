import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {DatabaseService} from "./database.service";
import {DatabaseInter} from "../../modals/database-inter"


export class dataSourceDatabase implements DataSource<DatabaseInter>{
    

    private subjectDataBases = new BehaviorSubject<DatabaseInter[]>([]);
    constructor(
        private dbService: DatabaseService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<DatabaseInter[]> {
        return this.subjectDataBases.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.subjectDataBases.complete();
    }

    //LLama al servicio de GetDB
    getDB(dataLogin){
        this.dbService.getDataBases(dataLogin)
        .subscribe((res) => {
            this.subjectDataBases.next(res['content'])
        });
    }

    addDB(data, dataLogin){
        this.dbService.addDatabase(data, dataLogin).subscribe();
    }


}