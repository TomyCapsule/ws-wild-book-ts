import styles from './AddWilder.module.css';
import PropTypes from 'prop-types';
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from 'react';
import { WildersListContext } from '../../context/WildersList';
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client/react/hooks";
import { formatWilder } from '../../utils/utils';
import { WilderFragment } from '../../gql/fragments';

interface AddWilderInputs {
    name: string,
    city: string,
    avatar: File
}

const ADD_WILDER = gql`
${WilderFragment}
mutation createWilder($avatar: String!, $city: String!, $name: String!) {
  createWilder(avatar: $avatar, city: $city, name: $name) {
    ...WilderFragment
  }
}
`

const AddWilder = () => {
    const { wildersList, setWildersList } = useContext(WildersListContext);
    const { register, handleSubmit } = useForm<AddWilderInputs>();
    
    const [createWilder] = useMutation(ADD_WILDER);

    const onSubmit : SubmitHandler<AddWilderInputs> = async ({name, city}): Promise<void> => {
        // const newWilder = await addWilder({name, city, avatar: name} as Wilder);
        const newWilder = await createWilder({
            variables: {
                name,
                city,
                avatar: name
            }
        })
        const updatedWilderList = [...wildersList, formatWilder(newWilder.data.createWilder)];
        setWildersList(updatedWilderList);
    }

    return(
        <div>
            <h2>Add a new Wilder</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.addForm}
            >
                <div className={styles.inputContainer}>
                    <label>Name :</label>
                    <input
                        placeholder="input name here" {...register("name")}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label>City :</label>
                    <input
                        placeholder="input city here" {...register("city")}
                    />
                </div>

                <button type="submit">Add Wilder</button>
            </form>
        </div>
    )
}

AddWilder.propTypes = {
    setWilderUpdate: PropTypes.func
}

export default AddWilder;

