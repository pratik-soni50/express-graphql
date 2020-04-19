import { SchemaDirectiveVisitor } from 'apollo-server-express';
// import { defaultFieldResolver } from 'graphql';

class SecureDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async function () {
      return '';
    };
  }
}

export default SecureDirective;
