import express from 'express';
import { PrismaTransactionModel } from './Models/PrismaModels/PrismaTransaction';
import { TransactionController } from './Controllers/TransactionController';
import { PrismaCategoryModel } from './Models/PrismaModels/PrismaCategory';
import { CategoryController } from './Controllers/CategoryController';

export const routes = express.Router();

//Users
routes.post('/register', async (req, res) => {
  const answer = {
    user: { id: 1, name: req.body.name, email: req.body.email },
    token: '315461846154'
  };
  return res.status(200).send(answer);
});

routes.post('/login', async (req, res) => {
  const answer = {
    user: { id: 1, name: req.body.name, email: req.body.email },
    token: '315461846154'
  };
  return res.status(200).send(answer);
});

routes.post('/validate', async (req, res) => {
  const answer = {
    user: { id: 1, name: 'Ederson', email: 'dede@gmail.com' }
  };
  return res.status(200).send(answer);
});

routes.post('/logout', (req, res) => {
  res.status(200).send();
  // return { status: true };
});

//Categories
routes.get('/get-categories', async (req, res) => {
  try {
    const category = new PrismaCategoryModel();
    const categoryController = new CategoryController(category);
    const data = await categoryController.getCategories();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});
routes.post('/add-category', async (req, res) => {
  const newCategory = req.body.name;
  try {
    const category = new PrismaCategoryModel();
    const categoryController = new CategoryController(category);
    await categoryController.addCategory(newCategory);
    return res.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

// routes.get('/transactions', async (req, res) => {
//   const allTransactions = new PrismaTransactionModel();
//   const result = await allTransactions.show();
//   res.send(result);
// });

// routes.post('/transactions', async (req, res) => {
//   let { title, type, category, amount, createdAt } = req.body;
//   try {
//     const newTransaction = new PrismaTransactionModel();
//     const transactionController = new TransactionController(newTransaction);
//     createdAt = new Date(createdAt);
//     await transactionController.addTransaction({ title, type, category, amount, createdAt });
//     const lastTransaction = await transactionController.getLastTransaction();
//     const data = JSON.parse(JSON.stringify(lastTransaction));
//     return res.status(201).send(data);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send();
//   }
// });
