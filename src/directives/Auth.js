import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

const capabilityObj = {
  ADMIN: ['ADMIN', 'MANAGER', 'REVIEWER', 'USER'],
  MANAGER: ['MANAGER', 'REVIEWER', 'USER'],
  REVIEWER: ['REVIEWER', 'USER'],
  USER: ['USER'],
}

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { role } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async (data, args, context, info) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('User Must Aurthorized');
      }
      const result = await resolve.apply(this, [data, args, context, info]);
      if (capabilityObj[currentUser.role].indexOf(role) !== -1) {
        return result;
      }
      throw new AuthenticationError('User not Aurthorized to access this field');
    }
  }
}

export default AuthDirective;
