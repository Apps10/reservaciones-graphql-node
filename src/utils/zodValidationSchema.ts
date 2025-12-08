import { ZodSchema } from "zod";
import { ValidationInputException } from "../exceptions/generic.exception";

export const ZodValidateSchema = (schema: ZodSchema, args: any) => {
  const result = schema.safeParse(args);
  if (!result.success) {
    const { _errors, ...rest } = result.error.format();
    throw new ValidationInputException(JSON.stringify(rest));
  }
};
