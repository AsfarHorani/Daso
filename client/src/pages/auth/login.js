import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from "formik";
import { Button, CircularProgress } from '@material-ui/core';
import * as yup from "yup";
import './auth.css'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Login(props) {

    const navigate = useNavigate();
    const { signinHandler, isAuth, loading, authError } = useContext(AuthContext)
    useEffect(() => {
        console.log("rendering...")
    }, [])


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
            email: yup.string().email("Please enter a vaid email").required("Required")
        }),
        onSubmit: (values) => {

            signinHandler({ email: values.email, password: values.password })

        }

    }

    )


    return (
        <div className="login" >
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit} >
                {authError && <lable className="authError">*{authError}</lable>}

                <input
                    key="email"
                    id="email"
                    className='input'
                    type="email"
                    name="email"
                    onBlur={formik.handleBlur}
                    placeholder='Email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email} </p> : null}
                <input
                    key="password"
                    id="password"
                    className='input'
                    type="password"
                    placeholder="Passowrd"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.password} />
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password} </p> : null}
                <div className='subCont'><Button key="submit" className="button" type="submit">Login</Button>{loading && < CircularProgress className="progbar" />}</div>
                <Link to='/signup'> Don't have an account?</Link>
                <div>
                    <p class="hint"> <strong>Hint:</strong>  email: asfar@gmail.com</p>
                    <p> password: asfar123</p>
                </div>

            </form>
        </div>
    )
}

export default Login