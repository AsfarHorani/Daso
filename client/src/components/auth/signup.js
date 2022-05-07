import React, { useState } from 'react';
import { useFormik } from "formik";
import { Button } from '@material-ui/core';
import * as yup from "yup";
import './auth.css'
import { Link, useNavigate } from 'react-router-dom';
function Signup(props) {

    console.log(props)
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            username: "",
            password: "",

        },
        validationSchema: yup.object({
            name: yup.string().max(15, "Must be 15 charaters or less").min(3,"Name must have atleast 3 characters").required("Required"),
            username: yup.string().max(10, "Username must be between 10 and 5 characters").min(5, "Username must be between 10 and 5 characters").required("Required"),
            password: yup.string().required('No password provided.').min(8, 'Password is too short - should be 8 chars minimum.').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
            email: yup.string().email("Please enter a vaid email").required("Required")
        }),
        onSubmit: (values) => {
            console.log(formik.errors)
            const body = {
                name: values.name,
                email: values.email,
                username: values.username,
                password: values.password,
                image: image
            }
       
            props.signupHandler(body);
      
        }

    }

    )

    console.log(formik.errors)
    return (
        <div className="signup" >
            <h2>Sign up</h2>
            <form onSubmit={formik.handleSubmit} >
                <input
                    id="imageUpload"
                    type="file"
                    name="image"
                    placeholder="Profile picture (optional)"
                    required="" capture
                    onChange={(e) => { setImage(e.target.files[0]) }}

                />
                <input
                    key="name"
                    className='input'
                    id='name'
                    type="text"
                    onBlur={formik.handleBlur}
                    placeholder="Name"
                    onChange={formik.handleChange}
                    value={formik.values.name} />
                {formik.touched.name && formik.errors.name ? <p>{formik.errors.name} </p> : null}
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
                    key="username"
                    id="username"
                    className='input'
                    type="text"
                    onBlur={formik.handleBlur}
                    placeholder="Username"
                    onChange={formik.handleChange}
                    value={formik.values.username} />
                {formik.touched.username && formik.errors.username ? <p>{formik.errors.username} </p> : null}
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
                <Button key="submit" className="button" type="submit">Signup</Button>
                <Link to='/login'> Don't have an account?</Link>


            </form>
        </div>
    )
}

export default Signup