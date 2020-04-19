import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar NumberType

  directive @date on FIELD_DEFINITION
  directive @secureField on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
    password: String @secureField
    role: NumberType
    posts: [Post!]
    createdAt: String @date
    updatedAt: String @date
  }
  type Comment {
    id: ID!
    author: User!
    post: Post!
    content: String
    createdAt: String @date
    updatedAt: String @date
  }
  type Post {
    id: ID!
    author: User!
    content: String
    comments: [Comment!]
    createdAt: String @date
    updatedAt: String @date
  }
  type Query {
    hello: String!
    login(email: String!, password: String!): User
    users: [User!]!
    posts: [Post!]!
    comments: [Comment!]!
  }
  type Mutation {
    signUp(name: String!, email:String!, password:String): User
    createPost(author: String!, content: String!): Post
    updatePost(id: ID!, content: String!): Post
    createComment(author: String!, post: String!, content: String!): Comment
  }
`;

export default typeDefs;
