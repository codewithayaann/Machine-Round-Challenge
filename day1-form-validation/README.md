# React Dynamic Forms with Validation

This component allows you to create dynamic forms with customizable validation using a schema-based approach in React.

## Features

- Dynamic form generation from a schema.
- Validation for required fields, length, patterns, password strength, and matching fields.
- Event-driven validation (on `blur` or `change`).

## Usage

### 1. Define Your Form Schema

Create a form schema that outlines the fields and their validation rules.

```javascript

export const validationSchema = {
    name: {
        required: true,
        minLength: 2,
        maxLength: 50,
        pattern: /^[a-zA-Z ]+$/,
    },
    email: {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
        required: true,
        minLength: 8,
        strength: {
            uppercase: 1,
            lowercase: 1,
            digit: 1,
            special: 1,
        },
    },
    confirmPassword: {
        required: true,
        match: "password",
    },
};
```



```javascript
export const FORM = [
    { id: 'name', label: 'Name', name: 'name' },
    { id: 'email', label: 'Email', name: 'email', type: 'email' },
    { id: 'password', label: 'Password', name: 'password', type: 'password' },
    { id: 'confirmPassword', label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
];
```

### 3. Forms Component

```javascript
import React, { useState } from 'react';
import "./form.css";
import { validateForm } from './validate';

export const Forms = ({ forms, schema, validateOn }) => {
    const [errors, setError] = useState({});

    const handleValidate = (form, schema) => {
        const errors = validateForm(form, schema);
        const haveErrors = !!Object.keys(errors).length;
        setError(errors);
        return haveErrors;
    };

    const handleValidateOnEvent = (event) => {
        if (event.type === validateOn) {
            const name = event.target.name;
            const objectData = { [name]: event.target.value };
            const haveErrors = handleValidate(objectData, { [name]: schema[name] });
            if (haveErrors) return;
        }
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const obj = Object.fromEntries(formData);
        const haveErrors = handleValidate(obj, schema);
        if (haveErrors) return;
        alert("Hurray!! API HIT for save");
    };

    return (
        <form className='form d-flex flex-column' onSubmit={onSubmit}>
            {forms.map((form) => (
                <label className='d-flex label flex-column flex-start' key={form.id}>
                    <span>{form.label}</span>
                    <input
                        onBlur={handleValidateOnEvent}
                        onChange={handleValidateOnEvent}
                        type={form.type || 'text'}
                        className={errors[form.id] ? "invalid" : ""}
                        id={form.id}
                        name={form.name}
                    />
                    {errors[form.id] && <span className='error-red'>{errors[form.id]}</span>}
                </label>
            ))}
            <button className='submit-btn'>Submit</button>
        </form>
    );
};
```

### 4. Application Usage

```javascript
import React from 'react';
import { Forms } from './Forms';
import { validationSchema } from './validate';

const FORM = [
    { id: 'name', label: 'Name', name: 'name' },
    { id: 'email', label: 'Email', name: 'email', type: 'email' },
    { id: 'password', label: 'Password', name: 'password', type: 'password' },
    { id: 'confirmPassword', label: 'Confirm Password', name: 'confirmPassword', type: 'password' }
];

const App = () => (
    <Forms forms={FORM} schema={validationSchema} validateOn="blur" />
);

export default App;
```


