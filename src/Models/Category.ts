import { TransactionData } from './Transaction';

export interface CategoryData {
  id?: Number;
  name: string;
  transactions?: TransactionData[];
}

export interface CategoryModel {
  create: (category: CategoryData) => Promise<void>;
  getAll: () => Promise<CategoryData[]>;
}
