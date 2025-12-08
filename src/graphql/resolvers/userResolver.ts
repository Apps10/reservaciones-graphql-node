import { PrimitiveUser } from '../../interfaces/user';
import { UserSequelizeRepository } from '../../repositories/userSequelize.repository';
import { UserService } from '../../services/UserService';
import { validateLoginMiddleware, validateRegisterMiddleware } from '../validations/user.validation';

const userService = new UserService(new UserSequelizeRepository());

export const userResolvers = {
  Mutation: {
    register: validateRegisterMiddleware(async (_: any, args: PrimitiveUser) => {
      return await userService.register(args)
    }),
    login: validateLoginMiddleware(async (_: any, {email, password} : { email: string; password: string; }) => {
      return await userService.login(email, password)
    }),
  },
  Query: {
    account: async (_:any, {token}:{token:string} )=> {
      return await userService.verifyToken(token)
    }
  }
};

