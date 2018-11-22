import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserFb } from '../models/userFB';

@Injectable()
export class UserFbProvider {
    listList: UserFb[]; // Stores the List list for search functionality
    constructor(private db: AngularFireDatabase) {
    }
    getItems(): Observable<any[]> {
    let listObservable: Observable<any[]>;
    listObservable =
this.db.list('/users/').snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
listObservable.subscribe(result => {
this.listList = result;
});
return listObservable;
}

getItemsByStatus(status: string):Observable<any[]> {
var a = this.db.list('/users/', ref =>
ref.orderByChild('email').equalTo(status)).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))
));

// console.log("getByStatus");
// console.log(a)

// var email = a[0].email;
// var displayName = a[0].displayName;
// var displayPhoto = a[0].displayPhoto;
// var b = new UserFb(displayName,displayPhoto,email);
// return b;
return a;
}

getItemsByEmail(status: string) {
   return this.db.database.ref('/users/').orderByChild('email').equalTo(status).once('value', (snapshot) => {
        console.log("found in FB:")
        console.log(snapshot.val())
        return snapshot.val();
     })

    
    }

searchItems(val: string): UserFb[] {
    if (!val || !val.trim()) {
    // if no search term, return all foods.
    return this.listList;
    }
    val = val.toLowerCase();
    // Filter locally instead of invoking multiple calls to server
    // esp when user types character by charcter in search bar
    return this.listList.filter(item =>
    item.email.toLowerCase().includes(val));
}
addItem(item) {
this.db.list('/users/').push(item);
}
removeItem(item) {
this.db.list('/users/').remove(item.key);
}
updateItem(item) {
this.db.list('/users/').update(item.key, item);
}
}