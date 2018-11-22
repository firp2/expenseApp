import{ Pipe, PipeTransform } from '@angular/core';
import { UserFbProvider } from '../providers/user-firebase';
import { UserFb } from '../models/userFB';
//import { pipe } from '../../node_modules/rxjs';



@Pipe({
    name : 'getName',
})
export class getNamePipe implements PipeTransform{
    userFound = new UserFb("","","",0,"",0,0,"",0);
    
    constructor(private userService: UserFbProvider){

    }
    transform(value:string,...args){
      
        // console.log("value:" + value);
        // return new Promise(resolve => { this.userService.getItemsByStatus(value).subscribe(
        //     (user) => {
        //     //this.userFound = <UserFb>user[0];
        //      console.log("Found name: ");
        //     console.log(JSON.stringify(user));
        //     return user[0];
        //     //this.initIcon(); // Init icons after getting foods
        //     });
        //    //return name;
        //     }
        console.log("value:" + value);
        try {
            var a =  this.userService.getItemsByEmail(value);
            console.log(a);
        }
        catch(err) {
            console.log('Error: ', err.message);
        }
        
        console.log(a);
        return a;
    }
        //)}

}