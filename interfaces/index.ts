export interface Category {
  label: string;
  value: string;
}

export interface ProductItem {
  id: number;
  display_name: string;
  barcode: string | number;
  price: number;
  brand: string | number;
  category: string;
}
