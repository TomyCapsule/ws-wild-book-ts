import styles from './AddWilder.module.css';
import PropTypes from 'prop-types';
import { Wilder } from "../../types/Wilder";
import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from 'react';
import { WildersListContext } from '../../context/WildersList';
import { addWilder } from '../../api/wilder';

interface AddWilderInputs {
    name: string,
    city: string,
    avatar: File
}

const AddWilder = () => {
    const { wildersList, setWildersList } = useContext(WildersListContext);
    const { register, handleSubmit } = useForm<AddWilderInputs>();
    
    const onSubmit : SubmitHandler<AddWilderInputs> = async ({name, city}): Promise<void> => {
        const newWilder = await addWilder({name, city, avatar: name} as Wilder);
        const updatedWilderList = [...wildersList, newWilder];
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

                <div className={styles.inputContainer}>
                    <label>Avatar :</label>
                    <input
                        type="file"
                        placeholder="input city here" {...register("avatar")}
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

