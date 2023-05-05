import { useContext, useEffect } from "react";
import Card from "./Card/Card";
import styles from "./CardLayout.module.css";
import AddWilder from "../AddWilder/AddWilder";
import { WildersListContext } from "../../context/WildersList";
import { getWilders } from "../../api/wilder";

const CardLayout = () => {
  const { wildersList, setWildersList } = useContext(WildersListContext);

  useEffect(() => {
    const fetchWilders = async () : Promise<void> => {
      try{
        const wildersResponse = await getWilders()
        setWildersList(wildersResponse);
      }catch(err){
        console.log(err)
      }
    }

    fetchWilders();
  },[]);


  return (
    <>
      <AddWilder />
      <h2>Wilders</h2>
      <section className={styles.cardRow}>
        {
            wildersList.map(wilder => <Card key={wilder.id} id={wilder.id} name={wilder.name} skills={wilder.skills} city={wilder.city} avatar={wilder.avatar} description={wilder.description}/>)
        }
      </section>
    </>
  );
};

export default CardLayout;
