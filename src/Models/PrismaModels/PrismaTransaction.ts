import { prisma } from '../../prisma';
import { TransactionModel, TransactionData } from '../Transaction';

export class PrismaTransactionModel implements TransactionModel {
  async create({ title, type, category, amount }: TransactionData) {
    await prisma.transaction.create({
      data: {
        title,
        type,
        category,
        amount
      }
    });
  }
  async show() {
    const allTransactions = await prisma.transaction.findMany();
    return allTransactions;
  }
}
