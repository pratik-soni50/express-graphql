// const { ApolloServer, gql } = require('apollo-server');
import { GraphQLScalarType, Kind } from 'graphql';

const parseNumber = value => Number(value);

const NumberType = new GraphQLScalarType({
  name: 'NumberType',
  description: 'Javascript Number Type',
  serialize: parseNumber,
  parseValue: parseNumber,
  parseLiteral(ast) {
    if (ast.kind === Kind.Int || ast.kind === Kind.FLOAT) {
      return Number(ast.value);
    }
    return null;
  }
});

export default NumberType;
