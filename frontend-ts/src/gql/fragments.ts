import { gql } from "@apollo/client/core";

export const WilderFragment = gql`
    fragment WilderFragment on Wilder{
        id
        name
        city
        avatar
        description
        grades{
            grade
            skill{
                name
            }
        }
    }
`