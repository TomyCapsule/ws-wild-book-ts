import axios from "axios";
import { Wilder } from "../types/Wilder";

export async function addWilder({name, city, avatar}: Wilder) : Promise<Wilder>{
  const newWilder = await axios.post<Wilder>("http://localhost:5000/api/wilder", {
    name,
    city,
    avatar
  });
  return newWilder.data;
}

export async function getWilders() : Promise<Wilder[]>{
    const wildersResponse = await axios.get<Wilder[]>('http://localhost:5000/api/wilder');
    return wildersResponse.data;
}

export async function editWilder({id, name, city, avatar, description} : Wilder){
    const updatedWilder = await axios.put<Wilder>("http://localhost:5000/api/wilder",
      {
          id,
          name,
          city,
          avatar,
          description
      }
    );
    return updatedWilder.data;
}

export async function deleteWilder(id: number): Promise<number>{
    const deletedWilder = await axios.delete(
        "http://localhost:5000/api/wilder",
        {
          data: {
            id,
          },
        }
      );
    return deletedWilder.data;
}