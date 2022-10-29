import React from 'react'
export const validate = values => {
    const errors = {};
    if (!values.title) {
        errors.title = 'Required';
    } else if (values.title.length > 100) {
        errors.title = 'Must be 100 characters or less';
    }

    if (!values.task) {
        errors.task = 'Required';
    } else if (values.task.length > 300) {
        errors.task = 'Must be 300 characters or less';
    }

    if (!values.correctAnswer) {
        errors.correctAnswer = 'Required';
    }

    for(let i = 0; i < values.answers; i++) {
        if(values.answers[i] !== values.correctAnswer) {
            errors.correctAnswer = 'Must be like your answers you entered'
        }
    }

    return errors;
};




export default function ToggleColorMode() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
}