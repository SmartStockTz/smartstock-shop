import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {BFast} from 'bfastjs';
import {ConfigService} from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly router: Router,
              private readonly config: ConfigService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await BFast.auth().currentUser();
        if (user) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigateByUrl(`/shops/${this.config.shopDetails.value.projectId}/products`).catch();
        }
      } catch (e) {
        resolve(false);
      }
    });
  }

}
