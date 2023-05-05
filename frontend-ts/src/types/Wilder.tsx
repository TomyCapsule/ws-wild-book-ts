import { Grade } from "./Grade";

export interface Wilder {
    id: number,
    name: string,
    city: string,
    avatar: string,
    description: string,
    skills: Grade[]
}