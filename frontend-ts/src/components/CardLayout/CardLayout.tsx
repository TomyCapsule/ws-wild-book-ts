import { useContext, useEffect } from "react";
import Card from "./Card/Card";
import styles from "./CardLayout.module.css";
import AddWilder from "../AddWilder/AddWilder";
import { WildersListContext } from "../../context/WildersList";
import { useQuery } from "@apollo/client/react";
import { dataManipulation } from "../../utils/utils";
import { GET_ALL_WILDERS } from "../../gql/queries";

const CardLayout = () => {
  const { wildersList, setWildersList } = useContext(WildersListContext);
  const { loading, error, data } = useQuery(GET_ALL_WILDERS);

  useEffect(() => {
    if(data) setWildersList(dataManipulation(data.getAllWilders))
  }, [data])

  if(loading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>

  return (
    <>
      <AddWilder />
      <h2>Wilders</h2>
      <section className={styles.cardRow}>
        {
            wildersList.map((wilder: any) => <Card key={wilder.id} id={wilder.id} name={wilder.name} skills={wilder.skills} city={wilder.city} avatar={wilder.avatar} description={wilder.description}/>)
        }
      </section>
    </>
  );
};

export default CardLayout;
