import { UserData } from './User';
import { TransactionData } from './Transaction';

export interface PaymentMethodData {
  id: number;
  name: string;
  type: string;
  user: UserData;
  transactions?: TransactionData[];
}
