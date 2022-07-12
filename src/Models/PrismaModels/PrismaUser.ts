import { UserData, UserModel } from '../User';
import { PaymentMethodData } from '../PaymentMethod';
import { TransactionData } from '../Transaction';
import { prisma } from '../../prisma';

export class PrismaUserModel implements UserModel {
  async register({ name, email, password }: UserData): Promise<UserData | null> {
    await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    });
    const response = await this.getUser(email, password);
    return response;
  }
  async login(email: string, password: string): Promise<UserData | null> {
    const response = await this.getUser(email, password);
    return response;
  }
  async logout(): Promise<void> {}
  async getUser(email: string, password: string): Promise<UserData | null> {
    const newUser = await prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    });
    return newUser;
  }
}
