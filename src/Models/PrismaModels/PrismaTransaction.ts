import { type } from 'os';
import { prisma } from '../../prisma';
import { TransactionModel, TransactionData } from '../Transaction';
export class PrismaTransactionModel implements TransactionModel {
  async create({ title, type, category, amount, createdAt }: TransactionData) {
    await prisma.transaction.create({
      data: {
        title,
        type,
        category,
        amount,
        createdAt
      }
    });
  }
  async show() {
    const allTransactions = await prisma.transaction.findMany();
    return allTransactions;
  }
  async getLast() {
    const transactionsCount = await prisma.transaction.count({
      select: {
        _all: true
      }
    });
    const query = await prisma.transaction.findUnique({
      where: {
        id: transactionsCount._all
      }
    });
    if (query) {
      const lastTransaction: TransactionData = {
        id: query?.id,
        title: query.title,
        type: query.type,
        category: query.category,
        amount: query.amount,
        createdAt: query.createdAt
      };
      return lastTransaction;
    } else {
      return undefined;
    }
  }
}
