export interface StockModel {
  createdAt?: any;
  catalog?: any[];
  updatedAt?: any;
  image?: any;
  id?: string;
  _id?: string;
  product: string;
  barcode?: string;
  saleable?: boolean;
  canExpire?: boolean;
  description?: string;
  unit: string;
  category: string;
  type?: 'simple' | 'grouped';
  downloadable: boolean | false;
  downloads: { name: string, type: string, url: any }[];
  stockable: boolean;
  purchasable: boolean;
  quantity: number;
  wholesaleQuantity: number;
  reorder: number;
  purchase: number;
  retailPrice: number;
  wholesalePrice: any;
  supplier: string;
  expire: string;
}
