export type OrderShippingModel = {
  mode: 'pickup' | 'delivery',
  mobile: string,
  email: string,
  // country: string,
  location: string,
  notes: string,
};
