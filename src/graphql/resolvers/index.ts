import { mergeResolvers } from '@graphql-tools/merge';
import { userResolvers} from './userResolver';

const resolvers = mergeResolvers([userResolvers]);

export default resolvers;