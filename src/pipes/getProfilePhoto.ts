import{ Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../providers/auth-service';
//import { pipe } from '../../node_modules/rxjs';



@Pipe({
    name : 'getPhoto',
})
export class getPhotoPipe implements PipeTransform{
    
    constructor(private authService: AuthService){

    }
    transform(value:string,...args){
    
      return this.authService.getDownloadUrl(value).then(
            (url) => {
            console.log('Retrieved image pipe ' + url);
            if(url){
            return url;
            }else{
            return "assets/img/profileDefault.png";
            
            }
            }, (err) => {
              return "assets/img/profileDefault.png";
            });
    }
}