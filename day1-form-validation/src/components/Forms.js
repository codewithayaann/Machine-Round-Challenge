import React, { useState } from 'react'
import "./form.css"
import { validateForm } from './validate';

export const Forms = ({ forms, schema, validateOn }) => {
    const [errors, setError] = useState({})

    const handleValidate = (form, schema) => {
        const errors = validateForm(form, schema);
        const haveErrors = !!Object.keys(errors).length;
        setError(errors)
        return haveErrors;
    };

    const handleValidateOnEvent = (event) => {
        if (event.type === validateOn) {
            const name = event.target.name
            const objectData = {
                [name]: event.target.value
            }
            const haveErrors = handleValidate(objectData, {
                [name]: schema[name]
            })
            if (haveErrors) return;
        }
    }


    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target)
        const obj = Object.fromEntries(formData);
        const haveErrors = handleValidate(obj, schema);
        if (haveErrors) return;
        alert("Hurray!! API HIT for save");

    }


    return (
        <form className='form d-flex flex-column' onSubmit={onSubmit}>
            {forms.map((form) => (
                <label className='d-flex label flex-column flex-start'>
                    <span>{form.label}</span>
                    <input
                        onBlur={handleValidateOnEvent}
                        onChange={handleValidateOnEvent}
                        type={form.type} className={errors[form.id] ? "invalid" : ""} id={form.id} name={form.name} />
                    {errors[form.id] && <span className='error-red'>{errors[form.id]}</span>}
                </label>
            ))}
            <button className='submit-btn'>Submit</button>
        </form>
    )
}
