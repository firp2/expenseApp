import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { List } from '../models/list';

@Injectable()
export class ListFbProvider {
    listList: List[]; // Stores the List list for search functionality
    constructor(private db: AngularFireDatabase) {
    }
    getItems(): Observable<any[]> {
    let listObservable: Observable<any[]>;
    listObservable =
this.db.list('/recipeItems/').snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
listObservable.subscribe(result => {
this.listList = result;
});
return listObservable;
}
getItemsByStatus(status: string): Observable<any[]> {
    let listObservable: Observable<any[]>;
    listObservable= this.db.list('/recipeItems/', ref =>
ref.orderByChild('type').equalTo(status)).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
listObservable.subscribe(result => {
    this.listList = result;
    });
    return listObservable;
}
searchItems(val: string): List[] {
    if (!val || !val.trim()) {
    // if no search term, return all foods.
    return this.listList;
    }
    val = val.toLowerCase();
    // Filter locally instead of invoking multiple calls to server
    // esp when user types character by charcter in search bar
    return this.listList.filter(item =>
    item.name.toLowerCase().includes(val));
}
addItem(item) {
this.db.list('/recipeItems/').push(item);
}
removeItem(item) {
this.db.list('/recipeItems/').remove(item.key);
}
updateItem(item) {
this.db.list('/recipeItems/').update(item.key, item);
}
}