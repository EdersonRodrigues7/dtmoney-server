export interface TransactionData {
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

export interface TransactionModel {
  create: (data: TransactionData) => Promise<void>;
  show: () => Promise<TransactionData[]>;
}
