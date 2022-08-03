import { PaymentMethodData } from './PaymentMethod';
import { TransactionData } from './Transaction';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  token?: string | null;
  transactions?: TransactionData[];
  payment_methods?: PaymentMethodData[];
}

export interface UserModel {
  register: (user: UserData) => Promise<UserData | null>;
  login: (email: string, password: string) => Promise<UserData | null>;
  logout: (id: string) => Promise<void>;
  setToken: (token: string, id?: string) => Promise<void>;
  getUser: (email?: string, token?: string) => Promise<UserData | null>;
}
