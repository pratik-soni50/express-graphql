import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';
import dateFormat from 'date-fns/format'

class DateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { format } = this.args;
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      try {
        return dateFormat(result, format || 'MMM do yyyy');
      } catch {
        return result;
      }
    };
  }
}

export default DateDirective;
