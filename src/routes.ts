import express from 'express';
import { PrismaTransactionModel } from './Models/PrismaModels/PrismaTransaction';
import { TransactionController } from './Controllers/TransactionController';

export const routes = express.Router();

routes.get('/transactions', async (req, res) => {
  const allTransactions = new PrismaTransactionModel();
  const result = await allTransactions.show();
  res.send(result);
});

routes.post('/transactions', async (req, res) => {
  const { title, type, category, amount, createdAt } = req.body;
  try {
    const newTransaction = new PrismaTransactionModel();
    const transactionController = new TransactionController(newTransaction);
    await transactionController.addTransaction({ title, type, category, amount, createdAt });

    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});
