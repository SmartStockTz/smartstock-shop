import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MallModel} from '../models/mall.model';
import {MallService} from '../services/mall.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {init} from 'bfast';
import {getDaasAddress, getFaasAddress} from '@smartstocktz/core-libs';
import {StockModel} from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class MallState {
  selectedTab = new BehaviorSubject(0);
  totalProducts: BehaviorSubject<number> = new BehaviorSubject<any>(0);
  loadProducts: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  loadMoreProducts: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
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
  products: BehaviorSubject<StockModel[]> = new BehaviorSubject<StockModel[]>([]);
  private query = new BehaviorSubject('');
  private $skip = 20;

  constructor(private readonly mallService: MallService,
              private readonly snack: MatSnackBar) {
  }

  getTotalProducts(): void {
    this.mallService.totalProducts(this.shop.value.shop.projectId).then(value => {
      this.totalProducts.next(value);
    }).catch(reason => {
      console.log(reason);
      this.totalProducts.next(0);
    });
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
          init({
            applicationId: this.shop.value.shop.applicationId,
            projectId: this.shop.value.shop.projectId,
            // @ts-ignore
            databaseURL: getDaasAddress(this.shop.value.shop),
            // @ts-ignore
            functionsURL: getFaasAddress(this.shop.value.shop),
          }, this.shop.value.shop.projectId);
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

  fetchProducts(size: number, skip: number, d?: (d: boolean) => void): void {
    setTimeout(() => this.loadProducts.next(true), 0);
    this.mallService.getProducts(size, skip, this.query.value, this.shop.value.shop.projectId).then(value => {
      // console.log(value);
      if (skip === 0) {
        this.products.next(value);
      } else {
        this.products.value.push(...value);
        this.products.next(this.products.value);
      }
      if (d) {
        d(value && value.length > 0);
      }
    }).catch(reason => {
      this.snack.open(reason && reason.message ? reason.message : reason.toString(), 'Ok', {
        duration: 2000
      });
    }).finally(() => {
      this.loadProducts.next(false);
      this.loadMoreProducts.next(false);
    });
  }

  fetchMoreProducts(size: number): void {
    if (this.loadMoreProducts.value === true) {
      console.log('another load more loading');
      return;
    }
    this.loadMoreProducts.next(true);
    console.log(size, 'SIZE');
    console.log(this.$skip, 'SKIP');
    this.fetchProducts(size, this.$skip, (value) => {
      if (value === true) {
        // if (this.$skip === 0) {
        //   this.$skip = size;
        // } else {
        this.$skip += size;
        // }
      }
    });
  }

  searchProduct(q: string): void {
    this.query.next(q);
    this.$skip = 0;
    this.fetchProducts(20, 0);
  }
}
