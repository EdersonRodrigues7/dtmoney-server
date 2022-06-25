import { TransactionModel } from '../Models/Transaction';

interface TransactionControllerRequest {
  title: string;
  type: string;
  category: string;
  amount: number;
  createdAt: Date;
}

export class TransactionController {
  constructor(private transaction: TransactionModel) {}
  async addTransaction(request: TransactionControllerRequest) {
    const { title, type, category, amount, createdAt } = request;
    await this.transaction.create({
      title,
      type,
      category,
      amount,
      createdAt
    });
  }
}
