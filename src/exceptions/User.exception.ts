import { DomainCustomException } from "./domain-custom-exception";

export const UserNotFoundException = DomainCustomException('UserNotFoundException', 400, "User Not Found");
export const UserUnauthorizedException = DomainCustomException('Unauthorized', 401, "Unauthorized");
export const UserAlreadyExistException = DomainCustomException('UserAlreadyExist', 400, "User Already Register");
export const UserAuthenticationFailException = DomainCustomException('UserAuthenticationFailException', 401, "User Authentication Fail Exception");