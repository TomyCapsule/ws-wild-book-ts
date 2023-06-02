import { gql } from "apollo-server";

const typeDefs = gql`
    type Wilder {
        name: String
        city: String
        avatar: String
        description: String
        grades: [Grade]
    }

    type Grade {
        grade: Int
        skill: Skill
    }

    type Skill {
        name: String
    }

    type Query {
        getAllWilders: [Wilder]
    }

    type Mutation {
        createWilder: (name: String, city: String, avatar: String) => Wilder
    }
`

export default typeDefs;