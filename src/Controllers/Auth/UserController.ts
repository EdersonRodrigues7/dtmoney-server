import { UserData, UserModel } from '../../Models/User';

type UserControllerResponse = {
  user: UserData | null;
  token: string;
};

export class UserController {
  constructor(private user: UserModel) {}
  async register(user: UserData): Promise<UserControllerResponse> {
    const newUser = await this.user.register(user);
    const token = '315461846154';
    return { user: newUser, token: token };
  }
  async login(email: string, password: string): Promise<UserControllerResponse> {
    const currentUser = await this.user.login(email, password);
    const token = '315461846154';
    return { user: currentUser, token: token };
  }
}
