import {Injectable} from '@angular/core';
import { auth, database, functions } from 'bfast';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  loginWithGoogle(): Promise<any> {
    return auth().logIn('default', 'default');
  }

  async isLoggedIn(): Promise<any> {
    const user = await auth().currentUser();
    if (user) {
      return user;
    } else {
      return null;
    }
  }

  async logOut(): Promise<any> {
    return auth().logOut();
  }

  async profile(): Promise<any> {
    try {
      const users = await database('smartstock').collection('_User').query()
      .equalTo('username','tikimushi@gmail.com').find({useMasterKey: true});
      // console.log(users);
      let user = Array.isArray(users)?users[0]:null;
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

