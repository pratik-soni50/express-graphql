import DateDirective from './Date';
import SecureDirective from './SecureField';
import AuthDirective from './Auth';

const schemaDirectives = {
  date: DateDirective,
  secureField: SecureDirective,
  auth: AuthDirective,
}

export default schemaDirectives;
