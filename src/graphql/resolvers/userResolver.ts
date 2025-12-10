import { userFactoryService } from "../../factories/serviceDependenciest";
import { PrimitiveUser } from "../../interfaces/user";
import {
  validateLoginMiddleware,
  validateRegisterMiddleware,
} from "../middleware/user.middleware";


export const userResolvers = {
  Mutation: {
    registerUser: validateRegisterMiddleware(
      async (_: any, args: PrimitiveUser) => {
        const result = await userFactoryService.register(args);
        return result;
      }
    ),
    loginUser: validateLoginMiddleware(
      async (
        _: any,
        { email, password }: { email: string; password: string }
      ) => {
        return await userFactoryService.login(email, password);
      }
    ),
  },
  Query: {
    account: async (_: any, { token }: { token: string }) => {
      return await userFactoryService.verifyToken(token);
    },
  },
};
