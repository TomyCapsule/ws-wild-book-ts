import { gql } from "@apollo/client/core";

export const GET_ALL_WILDERS = gql`
query GetAllWilders{
  getAllWilders{
    id
    name
    description
    city
    avatar
    grades{
      grade
      skill{
        name
      }
    }
  }
} 
`