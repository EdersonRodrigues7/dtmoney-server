import { UserData } from '../../Models/User';
import { PrismaUserModel } from '../../Models/PrismaModels/PrismaUser';

export class TokenController {
  private apiToken = process.env.API_TOKEN;
  public userModel = new PrismaUserModel();
  constructor(user?: UserData | null) {}
  createNewToken(id?: string): string {
    if (id) {
      const token = this.generate(id);
      return token;
    }
    return '';
  }
  static async deleteToken(id: string): Promise<void> {
    const modelToken = new PrismaUserModel();
    await modelToken.logout(id);
    return;
  }
  async validateToken(testToken: string): Promise<UserData | null> {
    if (this.apiToken && testToken.includes(this.apiToken)) {
      const validUser = await this.userModel.getUser('', testToken);
      console.log(`Valid User: ${validUser}`);
      return validUser;
    }
    return null;
  }
  private generate(id: string): string {
    let tokenBase = id;
    tokenBase += `-${process.env.API_TOKEN}`;
    const fullToken = tokenBase.split('-').sort().join('');
    return fullToken;
  }
}
