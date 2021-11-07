import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MallModel} from '../models/mall.model';
import {MallService} from '../services/mall.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MallState {
  loadProducts: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  loadShop: BehaviorSubject<boolean> = new BehaviorSubject<any>(true);
  shop: BehaviorSubject<MallModel> = new BehaviorSubject<MallModel>({
    uid: null,
    shop: {
      projectId: '',
      ecommerce: {
        cover: '',
        about: '',
        logo: ''
      },
      applicationId: '',
      businessName: '',
      country: '',
      region: '',
      settings: {
        currency: 'Tsh',
      }
    }
  });

  constructor(private readonly mallService: MallService,
              private readonly snack: MatSnackBar) {
  }

  getShop(id: string): void {
    this.loadShop.next(true);
    const shop = this.shop.value?.shop;
    if (shop && shop.projectId === id) {
      this.loadShop.next(false);
    } else {
      this.mallService.getShop(id).then(value => {
        if (Array.isArray(value) && value.length === 1) {
          this.shop.next(value[0]);
        } else {
          this.shop.next(null);
        }
      }).catch(reason => {
        console.log(reason);
        this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
          duration: 2000
        });
        this.shop.next(null);
      }).finally(() => {
        this.loadShop.next(false);
      });
    }
  }
}
