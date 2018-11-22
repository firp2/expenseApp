import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable()
export class ProductFbProvider {
    productList: Product[]; // Stores the expense list for search functionality
    constructor(private db: AngularFireDatabase) {
    }

    getProducts(): Observable<any[]> {
        let productObservable: Observable<any[]>;
        productObservable =this.db.list('/foodProducts/').snapshotChanges().pipe(
    map(changes =>
    changes.map(c => ({ key: c.payload.key, ...c.payload.val()
    }))));
    productObservable.subscribe(result => {
    this.productList = result;
    });
    return productObservable;
    }

    getProductsByUpc(data: string): Observable<any[]> {
        let productObservable: Observable<any[]>;
        productObservable = this.db.list('/foodProducts/', ref =>
    ref.orderByChild('upc').equalTo(data)).snapshotChanges().pipe(
    map(changes =>
    changes.map(c => ({ key: c.payload.key, ...c.payload.val()
    }))));
    productObservable.subscribe(result => {
        this.productList = result;
        });
        return productObservable;
    }
    
}


