import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Community } from '../models/community';

@Injectable()
export class CommunityFbProvider{
    abc:string;
    communityList: Community[]; // Stores the community list for search functionality
    constructor(private db: AngularFireDatabase) {
    }
    getItems(): Observable<any[]> {
    let communityObservable: Observable<any[]>;
    communityObservable = this.db.list('/communityItems/').snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
communityObservable.subscribe(result => {
this.communityList = result;
});
return communityObservable;
}

getItemsByStatus(status: string): Observable<any[]> {
return this.db.list('/communityItems/', ref =>
ref.orderByChild('status').equalTo(status)).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
}

addItem(item) {
this.db.list('/communityItems/').push(item);
}
removeItem(item) {
this.db.list('/communityItems/').remove(item.key);
}
updateItem(item) {
this.db.list('/communityItems/').update(item.key, item);
}
}