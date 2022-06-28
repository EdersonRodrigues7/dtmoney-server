export interface TransactionData {
  id?: Number;
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

export interface TransactionModel {
  create: (data: TransactionData) => Promise<void>;
  show: () => Promise<TransactionData[]>;
  getLast: () => Promise<TransactionData | undefined>;
}
