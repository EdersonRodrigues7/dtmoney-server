import { PaymentMethodData } from './PaymentMethod';
import { TransactionData } from './Transaction';

export interface UserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  transactions?: TransactionData[];
  payment_methods?: PaymentMethodData[];
}

export interface UserModel {
  register: (user: UserData) => Promise<UserData | null>;
  login: (email: string, password: string) => Promise<UserData | null>;
  logout: () => Promise<void>;
  getUser: (email: string, password: string) => Promise<UserData | null>;
}
