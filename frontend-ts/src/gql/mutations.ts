import { gql } from "@apollo/client/core";
import { WilderFragment } from "./fragments";

export const DELETE_WILDER = gql`
mutation DeleteWilder($id: Float!){
  deleteWilder(id: $id)
}
`

export const UPDATE_WILDER = gql`
${WilderFragment}
mutation UpdateWilder($id: Float!, $name: String!, $city: String!, $avatar: String!, $description: String!){
    updateWilder(id: $id, name: $name, city: $city, description: $description, avatar: $avatar){
        ...WilderFragment
    }
}
`

export const CREATE_GRADE = gql`
mutation CreateGrade($grade: Float!, $wilderId: Float!, $skill: String!){
    createGrade(grade: $grade, wilderId: $wilderId, skill: $skill)
}
`

export const DELETE_GRADE = gql`
mutation DeleteGrade($skill: String!, $wilderId: Float!){
    deleteGrade(skill: $skill, wilderId: $wilderId)
}
`