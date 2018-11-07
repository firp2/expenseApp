import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Expense } from '../models/Expense';
import firebase from 'firebase';

@Injectable()
export class ExpenseFbProvider {
    listList: Expense[]; // Stores the List list for search functionality
    constructor(private db: AngularFireDatabase) {
    }
    getItems(): Observable<any[]> {
    let listObservable: Observable<any[]>;
    listObservable =
this.db.list('/expenseItems/').snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
listObservable.subscribe(result => {
this.listList = result;
});
return listObservable;
}
getItemsByStatus(status: string): Observable<any[]> {
return this.db.list('/expenseItems/', ref =>
ref.orderByChild('status').equalTo(status)).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
}
searchItems(val: string): Expense[] {
    if (!val || !val.trim()) {
    // if no search term, return all foods.
    return this.listList;
    }
    val = val.toLowerCase();
    // Filter locally instead of invoking multiple calls to server
    // esp when user types character by charcter in search bar
    return this.listList.filter(item =>
    item.foodName.toLowerCase().includes(val));
}

/*Testing
orderByDate(){
return this.db.list('/expenseItems/', ref =>
ref.orderByChild("date").on("child_added", function(snapshot) {
    console.log(snapshot.key());
});
}
*/

//Dates
getDates(): Observable<any[]> {
    let listObservable: Observable<any[]>;
    listObservable =
this.db.list('/expenseItems/').snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
listObservable.subscribe(result => {
this.listList = result;
});
return listObservable;
}



addItem(item) {
this.db.list('/expenseItems/').push(item);
}
removeItem(item) {
this.db.list('/expenseItems/').remove(item.key);
}
updateItem(item) {
this.db.list('/expenseItems/').update(item.key, item);
}

// getDateOrder(day) {
//     return firebase.database()
//       .ref("expenseItems")
//       .orderByChild("date")
//       .once("value")
//       .then((snapshot) => {
//         let dateorder = [];
//         snapshot.forEach((child) => {
//           let val = child.val();
//           if (val.vacationStart <= day) {
//             dateorder.push(val);
//           }
//         });
//         return dateorder;
//       });
//   }
}