import { GraphQLError } from "graphql";
import {
  UserAuthenticationFailException,
  UserUnauthorizedException,
} from "./User.exception";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { DomainError } from "./domain-custom-exception";

export const GraphQLHandlerException = (err: GraphQLError) => {
  const exception = err.originalError as any;

  if (exception instanceof DomainError) {
    const { message, ...rest } = exception;

    const unauthorizedException = [
      UserUnauthorizedException,
      UserAuthenticationFailException,
    ];

    if (unauthorizedException.some((e) => exception instanceof e))
      return new AuthenticationError(message, rest);

    return new UserInputError(message, rest);
  }

  return err;
};
