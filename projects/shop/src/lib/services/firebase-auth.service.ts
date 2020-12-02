import {Injectable} from '@angular/core';
import {AuthAdapter} from 'bfastjs/dist/adapters/AuthAdapter';
import {BFast} from 'bfastjs';
import {UserModel} from 'bfastjs/dist/models/UserModel';
import * as _firebase from 'firebase';

const firebase = _firebase.default;

@Injectable({
  providedIn: 'root'
})

export class FirebaseAuthService implements AuthAdapter {
  async requestEmailVerification(email: string, appName: string, options?: any): Promise<any> {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      await currentUser.sendEmailVerification();
      return 'Email sent';
    } else {
      throw new Error('No any user');
    }
  }

  authenticated<T extends UserModel>(userId: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(a => {
        if (a) {
          resolve(a);
        } else {
          BFast.auth().setCurrentUser(null).catch();
          reject(null);
        }
      });
    });
  }

  async logIn<T extends UserModel>(username: string, password: string, appName: string, options?: any): Promise<any> {
    const auth = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // const bfastUser = await BFast.database().collection(BFast.utils.USER_DOMAIN_NAME)
    //   .get(user.uid, {returnFields: [], useMasterKey: true});
    // Object.assign(bfastUser, user);
    const userF = auth.user.toJSON() as any;
    delete userF.stsTokenManager;
    delete userF.multiFactor;
    delete userF.apiKey;
    delete userF.lastLoginAt;
    delete userF.token;
    userF.id = userF.uid;
    return userF;
  }

  async logOut(options?: any): Promise<boolean> {
    await firebase.auth().signOut();
    return true;
  }

  async requestPasswordReset<T extends UserModel>(email: string, appName: string, options?: any): Promise<any> {
    await firebase.auth().sendPasswordResetEmail(email);
    return 'Email sent';
  }

  async signUp<T extends UserModel>(username: string, password: string, attrs: any, appName: string, options?: any): Promise<T> {
    return this.logIn(null, null, appName, options);
  }

  async updateUser<T extends UserModel>(id: string, attrs: object, options?: any): Promise<any> {
  }

}
