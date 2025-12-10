import { DomainCustomException } from "./domain-custom-exception";

export const PropertyNotFoundException = DomainCustomException('PropertyNotFoundException', 400, "Property Not Found");
export const PropertyIsNotYoursException = DomainCustomException('PropertyIsNotYoursException', 400, "The Property Is Not Yours, Please Contact With Support");
export const PropertyGenericException = DomainCustomException('PropertyGenericException', 400, "Property generic Exception");
