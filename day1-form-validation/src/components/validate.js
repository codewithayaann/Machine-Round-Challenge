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

const validatePasswordStrength = (password, strengthSchema) => {
    const errors = [];
    if (strengthSchema.uppercase && !/[A-Z]/.test(password)) {
        errors.push("Must contain at least one uppercase letter");
    }
    if (strengthSchema.lowercase && !/[a-z]/.test(password)) {
        errors.push("Must contain at least one lowercase letter");
    }
    if (strengthSchema.digit && !/\d/.test(password)) {
        errors.push("Must contain at least one digit");
    }
    if (
        strengthSchema.special &&
        !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    ) {
        errors.push("Must contain at least one special character");
    }
    return errors;
};



const validateField = (formData, fieldValue, fieldSchema) => {
    if (fieldSchema.required && !fieldValue) {
        return "This field is required";
    }
    if (fieldSchema.minLength && fieldValue.length < fieldSchema.minLength) {
        return `This field must be at least ${fieldSchema.minLength} characters long`;
    }
    if (fieldSchema.maxLength && fieldValue.length > fieldSchema.maxLength) {
        return `This field must be no more than ${fieldSchema.maxLength} characters long`;
    }
    if (fieldSchema.pattern && !fieldSchema.pattern.test(fieldValue)) {
        return "Invalid Format";
    }
    if (fieldSchema.strength) {
        return validatePasswordStrength(fieldValue, fieldSchema.strength).join(
            ", "
        );
    }
    if (fieldSchema.match) {
        if (formData[fieldSchema.match] !== fieldValue) {
            return "Passwords do not match";
        }
    }
    return null;
};



export const validateForm = (formData = {}, schema = {}) => {
    const errors = {};
    Object.keys(schema).forEach((field) => {
        const fieldSchema = schema[field];
        const fieldValue = formData[field];
        const error = validateField(formData, fieldValue, fieldSchema);
        if (error) {
            errors[field] = error;
        }
    });
    return errors;
};

