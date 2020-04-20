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
  directive @auth(role: Role = USER) on FIELD_DEFINITION

  type User {
    id: ID!
    name: String!
    email: String!
    password: String @secureField
    role: Role
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
  type usersList {
    list: [User!]!
    count: Int
  }
  type postsList {
    list: [Post!]!
    count: Int
  }
  type commentsList {
    list: [Comment!]!
    count: Int
  }
  type Query {
    login(email: String!, password: String!): String
    users(page: Int = 1, perPage: Int = 10): usersList @auth
    posts(page: Int = 1, perPage: Int = 10): postsList @auth
    comments(page: Int = 1, perPage: Int = 10): commentsList @auth
  }
  type Mutation {
    signUp(name: String!, email:String!, password:String): User
    createPost(content: String!): Post @auth
    updatePost(id: ID!, content: String!): Post @auth
    createComment(post: String!, content: String!): Comment @auth
  }
`;

export default typeDefs;
