import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import format from 'date-fns/format'

class DateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      try {
        return format(result, 'MMM do yyyy');
      } catch {
        return result;
      }
    };
  }
}

export default DateDirective;
