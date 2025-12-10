import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers} from './userResolver';
import { propertyResolvers } from './propertyResolver';
import { blockedDateResolver } from './blockedDateResolver';

const resolvers = mergeResolvers([
  userResolvers, 
  propertyResolvers,
  blockedDateResolver
]);

export default resolvers;