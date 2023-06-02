import styles from "./Card.module.css";
import SkillBadge from "./SkillBadge/SkillBadge";
import PropTypes from "prop-types";
import { Wilder } from "../../../types/Wilder";
import { useState } from "react";
import Avatar, { genConfig } from "react-nice-avatar";
import CardEdit from "../CardEdit/CardEdit";
import { useMutation } from "@apollo/client/react/hooks";
import { DELETE_WILDER } from "../../../gql/mutations";
import { GET_ALL_WILDERS } from "../../../gql/queries";

interface CardProps extends Wilder {}

const Card = ({ id, name, skills, city, avatar, description }: CardProps) => {
  const avatarConfig = genConfig(avatar);

  const [isEditMode, setIsEditMode] = useState(false);
  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const [deletedWilder] = useMutation(DELETE_WILDER, {
    refetchQueries: [
      {
        query: GET_ALL_WILDERS
      }
    ]
  });

  const handleDelete = async (): Promise<void> => {
    await deletedWilder({
      variables:{
        id
      }
    });
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
            {skills.map((skill, idx) => (
              <SkillBadge
                key={idx}
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
  description: PropTypes.string
};

export default Card;
