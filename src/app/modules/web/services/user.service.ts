import {Injectable} from '@angular/core';
import {BFast} from 'bfastjs';

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
}
