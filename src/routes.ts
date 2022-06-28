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
  let { title, type, category, amount, createdAt } = req.body;
  try {
    const newTransaction = new PrismaTransactionModel();
    const transactionController = new TransactionController(newTransaction);
    createdAt = new Date(createdAt);
    await transactionController.addTransaction({ title, type, category, amount, createdAt });
    const lastTransaction = await transactionController.getLastTransaction();
    const data = JSON.parse(JSON.stringify(lastTransaction));
    return res.status(201).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});
