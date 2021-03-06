import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Food } from '../models/food';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class FoodFbProvider {
    foodList: Food[]; // Stores the expense list for search functionality
    dataBaseName: string;
    constructor(private db: AngularFireDatabase, private translate: TranslateService,) {
        var lang = this.translate.getDefaultLang();
        if(lang =='en'){
            //switch to english DB
            this.dataBaseName = '/foodItemsEnglish/';
        }
        else if (lang =='cn')
        {
            //switch to chinese DB
            this.dataBaseName = "/foodItems/"; 
        }
    }


    getItems(): Observable<any[]> {
       var lang = this.translate.getDefaultLang();
        if(lang =='en'){
            //switch to english DB
            this.dataBaseName = '/foodItemsEnglish/';
        }
        else if (lang =='cn')
        {
            //switch to chinese DB
            this.dataBaseName = "/foodItems/"; 
        }
    let foodObservable: Observable<any[]>;
    foodObservable =
this.db.list(this.dataBaseName).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
foodObservable.subscribe(result => {
this.foodList = result;
});
return foodObservable;
}

getItemsByStatus(status: string): Observable<any[]> {
    var lang = this.translate.getDefaultLang();
    if(lang =='en'){
        //switch to english DB
        this.dataBaseName = '/foodItemsEnglish/';
    }
    else if (lang =='cn')
    {
        //switch to chinese DB
        this.dataBaseName = "/foodItems/"; 
    }
    let foodObservable: Observable<any[]>;
    foodObservable = this.db.list(this.dataBaseName, ref =>
ref.orderByChild('type').equalTo(status)).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
foodObservable.subscribe(result => {
    this.foodList = result;
    });
    return foodObservable;
}

// 

getItemsByName(label: string): Observable<any[]> {
    var lang = this.translate.getDefaultLang();
    if(lang =='en'){
        //switch to english DB
        this.dataBaseName = '/foodItemsEnglish/';
    }
    else if (lang =='cn')
    {
        //switch to chinese DB
        this.dataBaseName = "/foodItems/"; 
    }
    let foodObservable: Observable<any[]>;
    foodObservable = this.db.list(this.dataBaseName, ref =>
ref.orderByChild('sortName').equalTo(label)).snapshotChanges().pipe(
map(changes =>
changes.map(c => ({ key: c.payload.key, ...c.payload.val()
}))));
foodObservable.subscribe(result => {
    this.foodList = result;
    });
    return foodObservable;
}

// Search Function

searchItems(val: string): Food[] {
    var lang = this.translate.getDefaultLang();
    if(lang =='en'){
        //switch to english DB
        this.dataBaseName = '/foodItemsEnglish/';
    }
    else if (lang =='cn')
    {
        //switch to chinese DB
        this.dataBaseName = "/foodItems/"; 
    }
    if (!val || !val.trim()) {
    // if no search term, return all foods.
    return this.foodList;
    }
    
    val = val.toLowerCase();
    // Filter locally instead of invoking multiple calls to server
    // esp when user types character by charcter in search bar
    return this.foodList.filter(item =>
    item.name.toLowerCase().includes(val) ||
    item.fat.toString().toLowerCase().includes(val) ||
    item.carbohydrates.toString().toLowerCase().includes(val) ||
    item.protein.toString().toLowerCase().includes(val) ||
    item.calorie.toString().toLowerCase().includes(val) ||
    item.notes && item.notes.toLowerCase().includes(val));
}
addItem(item) {
this.db.list('/foodItems/').push(item);
}
removeItem(item) {
this.db.list('/foodItems/').remove(item.key);
}
updateItem(item) {
this.db.list('/foodItems/').update(item.key, item);
}
}