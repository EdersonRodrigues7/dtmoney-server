import { UserData, UserModel } from '../User';
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
    const response = await this.getUser(email);
    return response;
  }
  async login(email: string, password: string): Promise<UserData | null> {
    const response = await prisma.user.findFirst({
      where: {
        email: email,
        password: password
      }
    });
    console.log(response);
    if (!response) return null;
    return response;
  }
  async logout(id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        token: null
      }
    });
  }
  async setToken(token: string, id?: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: id
      },
      data: {
        token: token
      }
    });
  }
  async getUser(email?: string, token?: string): Promise<UserData | null> {
    const targetUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { token: token }]
      }
    });
    return targetUser;
  }
}
