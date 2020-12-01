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
    try {
      const user = await BFast.functions('smartstock').request('/ecommerce/' + environment.projectId).get<any>();
      if (!user) {
        return {ecommerce: {social: {}, logo: '', cover: null}, businessName: '', email: ''};
      }
      if (user.ecommerce) {
        return user;
      } else {
        user.ecommerce = {social: {}, logo: '', cover: null};
        return user;
      }
    } catch (e) {
      return {ecommerce: {social: {}, logo: '', cover: null}, businessName: '', email: ''};
    }
  }
}

