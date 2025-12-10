import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers} from './userResolver';
import { propertyResolvers } from './propertyResolver';

const resolvers = mergeResolvers([
  userResolvers, 
  propertyResolvers
]);

export default resolvers;