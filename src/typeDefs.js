import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar NumberType

  enum Role {
    ADMIN
    MANAGER
    REVIEWER
    USER
  }

  directive @date(format: String = "MMM do yyyy") on FIELD_DEFINITION
  directive @secureField on FIELD_DEFINITION
  directive @auth(role: Role = ADMIN) on FIELD_DEFINITION

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
    login(email: String!, password: String!): String
    users: [User!]! @auth(role: USER)
    posts: [Post!]! @auth(role: USER)
    comments: [Comment!]! @auth(role: USER)
  }
  type Mutation {
    signUp(name: String!, email:String!, password:String): User
    createPost(content: String!): Post @auth(role: USER)
    updatePost(id: ID!, content: String!): Post @auth(role: USER)
    createComment(post: String!, content: String!): Comment @auth(role: USER)
  }
`;

export default typeDefs;
