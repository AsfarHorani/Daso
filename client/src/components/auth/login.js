import React, { useState } from 'react';
import { useFormik } from "formik";
import { Button } from '@material-ui/core';
import * as yup from "yup";
import './auth.css'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
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
            console.log(formik.errors) 
            navigate("/")
        }

    }

    )

    console.log(formik.errors)
    return (
        <div className="login" >
            <h2>Login</h2>
            <form onSubmit={formik.handleSubmit} >
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
                <Button key="submit" className="button" type="submit">Login</Button>
                 <Link to='/signup'> Don't have an account?</Link>


            </form>
        </div>
    )
}

export default Login