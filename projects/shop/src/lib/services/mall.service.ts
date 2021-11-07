import {Injectable} from '@angular/core';
import {MallModel} from '../models/mall.model';
import {database} from 'bfast';

@Injectable({
  providedIn: 'root'
})
export class MallService {
  constructor() {
  }

  async getShop(projectId: string): Promise<MallModel> {
    return database().table('_User').aggregate().stage({
      $match: {
        $or: [
          {
            projectId,
            role: 'admin',
          },
          {
            'shops.projectId': projectId,
            role: 'admin',
          }
        ]
      }
    }).stage({
      $sort: {
        updatedAt: -1
      }
    }).stage({
      $group: {
        _id: '$_id',
        shop: {
          $push: {
            businessName: '$businessName',
            projectId: '$projectId',
            country: '$country',
            region: '$region',
            applicationId: '$applicationId',
            settings: '$settings',
            ecommerce: {
              logo: '$ecommerce.logo',
              cover: '$ecommerce.cover',
              about: '$ecommerce.about',
            }
          }
        },
        shops: {$first: '$shops'}
      }
    }).stage({
      $project: {
        uid: '$_id',
        shop: {
          $concatArrays: ['$shops', '$shop']
        }
      }
    }).stage({
      $unwind: {
        path: '$shop',
      }
    }).stage({
      $unset: ['shop.projectUrlId', 'shop.ecommerce.social']
    }).stage({
      $match: {
        'shop.projectId': projectId
      }
    }).find({useMasterKey: true});
  }
}
