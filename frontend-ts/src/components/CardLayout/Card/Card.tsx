import styles from "./Card.module.css";
import SkillBadge from "./SkillBadge/SkillBadge";
import PropTypes from "prop-types";
import { Wilder } from "../../../types/Wilder";
import { useContext, useState } from "react";
import { WildersListContext } from "../../../context/WildersList";
import { deleteWilder } from "../../../api/wilder";
import Avatar, { genConfig } from "react-nice-avatar";
import CardEdit from "../CardEdit/CardEdit";

interface CardProps extends Wilder {}

const Card = ({ id, name, skills, city, avatar, description }: CardProps) => {
  const avatarConfig = genConfig(avatar);
  const { wildersList, setWildersList } = useContext(WildersListContext);

  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const handleDelete = async (): Promise<void> => {
    const deletedWilderId = await deleteWilder(id);
    const updatedWildersList = [...wildersList].filter(wilder => wilder.id !== deletedWilderId);
    setWildersList(updatedWildersList);
  };
  return isEditMode 
    ? <CardEdit id={id} name={name} city={city} skills={skills} avatar={avatar} description={description} toggleEditMode={toggleEditMode} /> 
    : (
        <article className={styles.card}>
          <div className={styles.avatarContainer}>
            <Avatar style={{ width: '100px', height: '100px'}} {...avatarConfig} />
          </div>
          <div className={styles.editButtonContainer}>
            <h3>{name}</h3>
            <button onClick={toggleEditMode}>Edit</button>
          </div>
          <h5>{city}</h5>
          <p>
            {description}
          </p>
          <h4>Wild Skills</h4>
          <ul className={styles.skills}>
            {skills.map((skill) => (
              <SkillBadge
                key={skill.title}
                title={skill.title}
                votes={skill.votes}
              />
            ))}
          </ul>
          <button onClick={handleDelete} className={styles.button}>
            Delete
          </button>
        </article>
      );
};

Card.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  skills: PropTypes.array,
  city: PropTypes.string,
  avatar: PropTypes.string,
};

export default Card;
