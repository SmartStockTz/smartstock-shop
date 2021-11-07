import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from '@smartstocktz/core-libs';
import {MallState} from '../states/mall.state';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly router: Router,
              private readonly mallState: MallState,
              private readonly userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.userService.currentUser();
        if (user) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigateByUrl(`/shops/${this.mallState.shop.value.shop.projectId}`).catch();
        }
      } catch (e) {
        resolve(false);
      }
    });
  }

}
