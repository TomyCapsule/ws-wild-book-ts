import styles from './AddWilder.module.css';
import PropTypes from 'prop-types';
import { useForm, SubmitHandler } from "react-hook-form";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client/react/hooks";
import { WilderFragment } from '../../gql/fragments';
import { GET_ALL_WILDERS } from '../../gql/queries';

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
    const { register, handleSubmit } = useForm<AddWilderInputs>();
    
    const [createWilder] = useMutation(ADD_WILDER, {
        refetchQueries:[
            { query: GET_ALL_WILDERS }
        ]
    });

    const onSubmit : SubmitHandler<AddWilderInputs> = async ({name, city}): Promise<void> => {
        await createWilder({
            variables: {
                name,
                city,
                avatar: name
            }
        })
    };

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

