import { GraphQLError } from "graphql";
import { UserAlreadyExistException, UserAuthenticationFailException, UserNotFoundException, UserUnauthorizedException } from "./User.exception";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { DomainError } from "./domain-custom-exception";
import { ValidationInputException } from "./generic.exception";

export const GraphQLHandlerException = (err: GraphQLError) => {
  const exception = err.originalError as any;

  if (exception instanceof DomainError) {
    
    const { message, ...rest} = exception
    const userInputException = [
      UserNotFoundException,
      UserAlreadyExistException,
      ValidationInputException
    ]

    const unauthorizedException = [
      UserUnauthorizedException,
      UserAuthenticationFailException
    ]
    
    if(userInputException.some((e=>exception instanceof e ))) return new UserInputError(message, rest)
    if(unauthorizedException.some((e=>exception instanceof e ))) return new AuthenticationError(message, rest)
   

    return {
      message: "UNSUPPORTED_ERROR",
      extensions: {
        code: exception.name,
        statusCode: exception?.statusCode,
        message: exception.message
      }
    };
  }

  return exception;
}