import {TestBed, waitForAsync} from '@angular/core/testing';
import {OrderService} from './order.service';
import {cache, init, getConfig, RestRequestConfig} from 'bfast';
import {OrderShippingModel} from '../models/order-shipping.model';
import {HttpRequestInfoModel} from 'bfast/dist/lib/models/http-request-info.model';

describe('OrderService', () => {
  const ship: OrderShippingModel = {
    notes: 'no',
    mobile: '0764943055',
    mode: 'pickup',
    email: 'josh',
    location: 'ss'
  };
  let orderService: OrderService;
  beforeAll(() => {
    init({
      applicationId: 'ng_test',
      projectId: 'ng_test',
    });
  });
  afterAll(() => {
    cache({database: 'e-commerce-cache', collection: 'shipping'}).clearAll();
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
    });
    orderService = TestBed.inject(OrderService);
    // .compileComponents();
  }));

  it('should be created', () => {
    expect(orderService).toBeTruthy();
  });

  describe('saveUserCachedLastBillingAddress', () => {
    it('should throw error if uid is null', (done) => {
      orderService.saveUserCachedLastBillingAddress(null, null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('uid must be string');
        done();
      });
    });
    it('should throw error if uid is undefined', (done) => {
      orderService.saveUserCachedLastBillingAddress(undefined, null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('uid must be string');
        done();
      });
    });
    it('should throw error if uid is object', (done) => {
      // @ts-ignore
      orderService.saveUserCachedLastBillingAddress({}, null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('uid must be string');
        done();
      });
    });
    it('should throw error if uid is array', (done) => {
      // @ts-ignore
      orderService.saveUserCachedLastBillingAddress([], null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('uid must be string');
        done();
      });
    });
    it('should throw error if uid is function', (done) => {
      // @ts-ignore
      orderService.saveUserCachedLastBillingAddress(() => {
      }, null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('uid must be string');
        done();
      });
    });
    it('should throw error if uid is number', (done) => {
      // @ts-ignore
      orderService.saveUserCachedLastBillingAddress(3, null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('uid must be string');
        done();
      });
    });
    it('should throw error if shipping is null', (done) => {
      orderService.saveUserCachedLastBillingAddress('test', null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('shipping object is invalid');
        done();
      });
    });
    it('should throw error if shipping is undefined', (done) => {
      orderService.saveUserCachedLastBillingAddress('test', undefined).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('shipping object is invalid');
        done();
      });
    });
    it('should throw error if shipping is incomplete', (done) => {
      // @ts-ignore
      orderService.saveUserCachedLastBillingAddress('test', {
        notes: 'no',
        mobile: '0764943055',
        mode: 'pickup',
        email: 'josh',
        // location: 'ss'
      }).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason.message).toBe('shipping object is invalid');
        done();
      });
    });
    it('should save the billing address to cache', async () => {
      const r = await orderService.saveUserCachedLastBillingAddress('test', ship);
      const r1: OrderShippingModel = await cache({database: 'e-commerce-cache', collection: 'shipping'}).get('test');
      expect(r).toBeTruthy();
      expect(r).toEqual(ship);
      expect(r).toEqual(r1);
    });
  });

  describe('userCachedLastBillingAddress', () => {
    beforeAll(async () => {
      await orderService.saveUserCachedLastBillingAddress('test', ship);
    });
    it('should return default if uid is null', async () => {
      const r = await orderService.userCachedLastBillingAddress(null);
      expect(r).toBeTruthy();
      expect(r).toEqual({
        notes: '',
        mode: 'pickup',
        mobile: '',
        location: '',
        email: '',
      });
    });
    it('should return default if uid is undefined', async () => {
      const r = await orderService.userCachedLastBillingAddress(undefined);
      expect(r).toBeTruthy();
      expect(r).toEqual({
        notes: '',
        mode: 'pickup',
        mobile: '',
        location: '',
        email: '',
      });
    });
    it('should return default if uid is object', async () => {
      // @ts-ignore
      const r = await orderService.userCachedLastBillingAddress({});
      expect(r).toBeTruthy();
      expect(r).toEqual({
        notes: '',
        mode: 'pickup',
        mobile: '',
        location: '',
        email: '',
      });
    });
    it('should return default if uid is array', async () => {
      // @ts-ignore
      const r = await orderService.userCachedLastBillingAddress([]);
      expect(r).toBeTruthy();
      expect(r).toEqual({
        notes: '',
        mode: 'pickup',
        mobile: '',
        location: '',
        email: '',
      });
    });
    it('should return default if uid is number', async () => {
      // @ts-ignore
      const r = await orderService.userCachedLastBillingAddress(1);
      expect(r).toBeTruthy();
      expect(r).toEqual({
        notes: '',
        mode: 'pickup',
        mobile: '',
        location: '',
        email: '',
      });
    });
    it('should return default if uid is function', async () => {
      // @ts-ignore
      const r = await orderService.userCachedLastBillingAddress(() => {
      });
      expect(r).toBeTruthy();
      expect(r).toEqual({
        notes: '',
        mode: 'pickup',
        mobile: '',
        location: '',
        email: '',
      });
    });
    it('should return saved shipping', async () => {
      const r = await orderService.userCachedLastBillingAddress('test');
      expect(r).toBeTruthy();
      expect(r).toEqual(ship);
    });
  });

  describe('saveOrder', () => {
    it('should throw error is order is null', (done) => {
      getConfig().credential().adapters = {
        // @ts-ignore
        http: c => {
          return {
            async post(url: string, data: any, config: RestRequestConfig, info: HttpRequestInfoModel): Promise<any> {
              throw {
                message: 'invalid order'
              };
            }
          };
        }
      };
      orderService.saveOrder(null).catch(reason => {
        expect(reason).toBeTruthy();
        expect(reason).toEqual({
          message: 'invalid order'
        });
        done();
      });
    });
  });
});

