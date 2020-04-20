import express from 'express';
import { ApolloServer } from "apollo-server-express";
import cors from 'cors';
import mongoose from 'mongoose';

import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';
import context from './utils/createContext';

const startServer = async () => {
  const app = express();

  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context,
    tracing: true,
  });

  server.applyMiddleware({ app });

  await mongoose.connect('mongodb://localhost:27017/account', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  });

  // app.get('/', (req, res) => res.send('App is working fine'));

  app.listen({ port: 4000 }, () =>
    console.log(`Now browse to http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
