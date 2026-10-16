
import { useFormContext } from "react-hook-form";
import type { RegisterOptions } from "react-hook-form";
import { findInputError, isFormInvalid } from "@/utils/posts/create-post-input-helper";
import styles from "./create-input.module.css";

interface ComponentProps {
    label: string;
    type: string;
    placeholder: string;
    name: string;
    validation?: RegisterOptions;
    multiline: boolean;
}

interface InputErrorProps {
    message: string;
}

const CreateInput = ({
    label,
    type,
    placeholder,
    name,
    validation,
    multiline,
}: ComponentProps) => {
    const { register, formState: { errors } } = useFormContext();

    // Find the error associated with this input
    const inputError = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputError);

    return (
        <div className={styles.createInputContainer}>
            <div>
                <h2>{label}</h2>

                {isInvalid && inputError.error && (
                    <InputError
                        message={inputError.error.message ?? "Invalid input"}
                    />
                )}
            </div>

            <div>
                {multiline ? (
                    <textarea
                        id={name}
                        className={styles.createTextarea}
                        placeholder={placeholder}
                        {...register(name, validation)}
                    />
                ) : (
                    <input
                        id={name}
                        className={styles.createInput}
                        type={type}
                        placeholder={placeholder}
                        {...register(name, validation)}
                    />
                )}
            </div>
        </div>
    );
};

const InputError = ({ message }: InputErrorProps) => {
    return (
        <div className={styles.createError}>
            {message}
        </div>
    );
};

export default CreateInput;
