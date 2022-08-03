import express from 'express';
import { PrismaTransactionModel } from './Models/PrismaModels/PrismaTransaction';
import { TransactionController } from './Controllers/TransactionController';
import { PrismaCategoryModel } from './Models/PrismaModels/PrismaCategory';
import { CategoryController } from './Controllers/CategoryController';
import { PrismaUserModel } from './Models/PrismaModels/PrismaUser';
import { UserController } from './Controllers/Auth/UserController';
import { TokenController } from './Controllers/Auth/TokenController';

export const routes = express.Router();

//Users
routes.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new PrismaUserModel();
    const controller = new UserController(newUser);
    const answer = await controller.register({ name, email, password });
    return res.status(200).send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

routes.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new PrismaUserModel();
    const controller = new UserController(newUser);
    const answer = await controller.login(email, password);
    if (answer === null) throw new Error('User not Found');
    return res.status(200).send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

routes.post('/validate', async (req, res) => {
  const testToken: string = req.body.token;
  const controller = new TokenController();
  try {
    const answer = await controller.validateToken(testToken);
    return res.status(200).send(answer);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
});

routes.post('/logout', (req, res) => {
  const id: string = req.body.id;
  try {
    TokenController.deleteToken(id);
    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
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
