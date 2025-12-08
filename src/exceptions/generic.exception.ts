import { DomainCustomException } from "./domain-custom-exception";

export const ValidationInputException = DomainCustomException('ValidationInputException', 400, "Validation Input Error");
