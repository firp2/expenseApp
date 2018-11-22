import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../models/expense';
import { DailyChartsPage } from '../pages/daily-charts/Daily-charts'


@Injectable()
export class ChartService {
  listList: Expense[];

  constructor(private db: AngularFireDatabase) { }

  getData(dataset: string) {
    return this.db.list(dataset)
  }



  getItemsByStatus(status): Observable<any[]> {
        return this.db.list('/expenseItems/', ref =>
        ref.orderByChild('calorie').equalTo(status)).snapshotChanges().pipe(
        map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val()
        }))));
        }


}