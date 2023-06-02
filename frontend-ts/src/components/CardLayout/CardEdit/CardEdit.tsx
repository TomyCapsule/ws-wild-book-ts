import styles from "./CardEdit.module.css";
import PropTypes from "prop-types";
import { Wilder } from "../../../types/Wilder";
import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import Avatar, { genConfig } from "react-nice-avatar";
import { useMutation } from '@apollo/client';
import { CREATE_GRADE, DELETE_GRADE, UPDATE_WILDER } from "../../../gql/mutations";
import { GET_ALL_WILDERS } from "../../../gql/queries";

interface CardFormInput {
  wilder: Wilder;
}

interface CardEditProps extends Wilder {
    toggleEditMode: () => void
}

const CardEdit = ({ id, name, skills, city, avatar, description, toggleEditMode }: CardEditProps) => {
  const [avatarSeed, setAvatarSeed] = useState<string>(avatar);
  const avatarConfig = genConfig(avatarSeed);

  const { register, handleSubmit, control } = useForm<CardFormInput>({
    defaultValues: {
      wilder: {
        name,
        city,
        skills,
        description
      },
    },
  });
  const { fields, append, remove } = useFieldArray({ control, name: "wilder.skills" });

  const [updateWilder] = useMutation(UPDATE_WILDER, { refetchQueries: [{ query: GET_ALL_WILDERS }]});
  const [createGrade] = useMutation(CREATE_GRADE);
  const [deleteGrade] = useMutation(DELETE_GRADE);

  const onSubmit: SubmitHandler<CardFormInput> = async ({
    wilder,
  }): Promise<void> => {

    if(skills.length > 0){
      for(const skill of skills){
        await deleteGrade({
          variables:{
            skill: skill.title,
            wilderId: id
          }
        })
      }
    }

    for(const skill of wilder.skills){
      await createGrade({
        variables: {
          grade: Number(skill.votes),
          wilderId: id,
          skill: skill.title
        }
      })
    }

    await updateWilder({
      variables: {
        id,
        name: wilder.name,
        city: wilder.city,
        avatar: avatarSeed,
        description: wilder.description ?? ""
      }
    });

    toggleEditMode();
  };

  return (
    <article className={styles.card}>
      <div
        className={styles.avatarContainer}
        onClick={() =>
          setAvatarSeed(Math.random().toString(36).substring(2, 10))
        }
      >
        <Avatar style={{ width: "100px", height: "100px" }} {...avatarConfig} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={name}
          {...register("wilder.name")}
          className={styles.editInput}
        />
        <input
          defaultValue={city}
          {...register("wilder.city")}
          className={styles.editInput}
        />
        <textarea
          maxLength={150}
          defaultValue={description}
          {...register("wilder.description")}
          style={{minWidth: '100%',maxWidth: '100%', maxHeight: '10em'}}
        />
        <h4>Wild Skills</h4>
        <ul className={styles.skills}>
          {fields.map((field, idx) => (
            <div style={{ display: "flex", gap: ".5em" }} key={field.id}>
              <input
                defaultValue={field.title}
                placeholder="input skill name here"
                {...register(`wilder.skills.${idx}.title`)}
                style={{ width: "8em", height: "fit-content" }}
              />

              <input
                defaultValue={field.votes}
                placeholder="input votes value here"
                type="number"
                {...register(`wilder.skills.${idx}.votes`)}
                style={{ width: "3em", height: "fit-content" }}
              />

              <button type="button" onClick={() => remove(idx)}>x</button>
            </div>
          ))}
          <button type="button" onClick={() => append({ title: "", votes: 0 })}>
            Add skill
          </button>
        </ul>
        <button type="submit" className={styles.button}>
          Confirm Edit
        </button>
      </form>
    </article>
  );
};

CardEdit.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    skills: PropTypes.array,
    city: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.string,
    toggleEditMode: PropTypes.func
  };

export default CardEdit;
