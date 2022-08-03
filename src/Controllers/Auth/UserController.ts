import { UserData, UserModel } from '../../Models/User';
import { TokenController } from './TokenController';

// UserNotFoundException

type UserControllerResponse = {
  user: UserData | null;
  token: Promise<string> | string;
} | null;

export class UserController {
  constructor(private user: UserModel) {}
  async register(user: UserData): Promise<UserControllerResponse> {
    const newUser = await this.user.register(user);
    if (newUser) {
      const token = await this.createUserToken(newUser);
      return { user: newUser, token: token };
    }
    return null;
    // return { user: null, token: '' };
  }
  async login(email: string, password: string): Promise<UserControllerResponse> {
    const currentUser = await this.user.login(email, password);
    if (currentUser) {
      const validate = new TokenController(currentUser);
      const token = validate.createNewToken(currentUser.id);
      return { user: currentUser, token: token };
    }
    // throw new Error('User not found');
    return null;
  }
  private async createUserToken(newUser: UserData): Promise<string> {
    const controller = new TokenController(newUser);
    const newToken = await controller.createNewToken(newUser.id);
    if (newToken !== '') {
      await this.user.setToken(newToken, newUser.id);
    }
    return newToken;
  }
}
