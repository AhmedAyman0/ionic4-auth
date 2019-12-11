import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { AuthService } from './Services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavController } from '@ionic/angular';
import { map } from 'rxjs/operators';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private AuthServ: AuthService, private navCtrl: NavController) {
  }
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    //  return this.AuthServ.Logined.pipe(
    //    map(e => {
    //     console.log(e);

    //     if (e) {
    //        return true;
    //      } else {
    //        this.navCtrl.navigateRoot('/auth');
    //        return false;
    //      }
    //    })
    //  );
    console.log(this.AuthServ.Logined);
    if(this.AuthServ.Logined){
      return true;
    }
    else{
      this.navCtrl.navigateRoot('/auth',{animationDirection:'forward'});
    }
  }

}
