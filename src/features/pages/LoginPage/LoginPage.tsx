import React, {useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {Button, Container, TextField} from "@mui/material";
import {Formik, useFormik} from "formik";
import * as Yup from "yup";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {isUserAdmin} from "../../../app/app-reducers/loginSlice";
import {useNavigate} from "react-router-dom";

export const schema = Yup.object().shape({
    email: Yup.string()
        .required("Email is a required field")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is a required field")
        .min(8, "Password must be at least 8 characters"),
});


const LoginPage = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.login.token)
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')) {
            navigate('../admin')
        }
    },[localStorage.getItem('token')])
    return (
        <div>
            <Container maxWidth="xs">
                <Typography sx={{color:'text.primary'}} variant="h4">Login As Admin</Typography>
                <Formik initialValues={{ email: "", password: "" }}
                        validationSchema={schema}
                        onSubmit={(values) => {
                            dispatch(isUserAdmin(values))
                        }}
                >
                    {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <div className="form-box">
                                <Typography sx={{color:'text.primary'}} variant='overline'>Enter login</Typography>
                                <TextField
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    variant="filled"
                                    fullWidth
                                />
                                <Typography color="darkred" variant="overline"  className="error">
                                    {errors.email && touched.email && errors.email}
                                </Typography>
                            </div>
                            <div className="form-box">
                                <Typography
                                    sx={{color:'text.primary'}} variant='overline'>Enter password</Typography>
                                <TextField
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    variant="filled"
                                    fullWidth
                                />
                                <Typography color="darkred"  variant="overline" className="error">
                                    {errors.password && touched.password && errors.password}
                                </Typography>
                            </div>

                            <Button style={{ marginTop:"30px" }} type="submit" variant="contained" fullWidth>LOGIN</Button>
                        </form> )}
                </Formik>
            </Container>
        </div>

    );
};

export default LoginPage;