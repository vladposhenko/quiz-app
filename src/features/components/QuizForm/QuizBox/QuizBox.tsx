import React, {FC} from 'react';
import Typography from "@mui/material/Typography";
import {TextField} from "@mui/material";

interface IQuizBox {
    title:string
    handleChange: any
    name: string
    label:string
    value:any
    errors:any
    component?:string
    type?:string
}

const QuizBox:FC<IQuizBox> = ({handleChange, name, label, value,errors, title,component, type}) => {
    return (
        <div className="form-box">
            <Typography sx={{color:'text.primary'}} variant='overline'> {title} </Typography>
            {component === 'textarea'
            ? <textarea className="form-task"
                        value={value}
                        onChange={handleChange}
                        name={name}></textarea>
            : <TextField
                    fullWidth
                    name={name}
                    value={value}
                    onChange={handleChange}
                    label={label}
                    type={type ? type : 'text'}
                    variant="filled"/>
            }
            {errors && <div className="form-error">{errors}</div>}
        </div>
    );
};

export default QuizBox;