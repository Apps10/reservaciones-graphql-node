import { z } from "zod";
import { PrimitiveUser } from "../../interfaces/user";
import { ZodValidateSchema } from "../../utils/zodValidationSchema";

export const validateRegisterMiddleware = (resolver: Function) => {
  return async (_parent: any, args: PrimitiveUser, context: any, info: any) => {
    const schema = z.object({
      name: z.string().min(3).max(20).nonempty(),
      lastName: z.string().min(3).max(30).nonempty(),
      email: z.string().email().min(8).max(30).nonempty(),
      password: z.string().min(8).max(20).nonempty(),
      // role: z.enum(["traveler", "owner"]),
    });

    ZodValidateSchema(schema, args);

    return resolver(_parent, args, context, info);
  };
};

export const validateLoginMiddleware = (resolver: Function) => {
  return async (
    _parent: any,
    args: { email: string; password: string },
    context: any,
    info: any
  ) => {
    const schema = z.object({
      email: z.string().email().nonempty(),
      password: z.string().nonempty(),
    });

    ZodValidateSchema(schema, args);

    return resolver(_parent, args, context, info);
  };
};

