import { useState } from "react"


export const useForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)


    const onFormState = (ev) => {
        const {name,value} = ev.target;
        setFormState({
            ...formState,
            [name]:value
        })
    }

    const onReset = (ev) => {
        setFormState(initialForm)
    }

    return{
        ...formState,
        formState,
        onFormState,
        onReset
    }

}