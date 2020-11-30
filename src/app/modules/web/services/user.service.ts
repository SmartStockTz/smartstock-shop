import {Injectable} from '@angular/core';
import {BFast} from 'bfastjs';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loginWithGoogle(): Promise<any> {
    return BFast.auth().logIn('default', 'default');
  }

  async isLoggedIn(): Promise<any> {
    const user = await BFast.auth().currentUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async logOut(): Promise<any> {
    return BFast.auth().logOut();
  }

  async profile(): Promise<any> {
    return BFast.functions('smartstock').request('/ecommerce/' + environment.projectId).get();
  }
}

