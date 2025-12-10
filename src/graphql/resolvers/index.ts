import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers} from './userResolver';
import { propertyResolvers } from './propertyResolver';
import { blockedDateResolver } from './blockedDateResolver';
import { bookingResolver } from './bookingResolver';

const resolvers = mergeResolvers([
  userResolvers, 
  propertyResolvers,
  blockedDateResolver,
  bookingResolver
]);

export default resolvers;