import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { setCurrentUser, getToken, setAuth } from '../store/store'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const notify = (text) => toast.error(text, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            email,
            password,
        }

        // GENERATING AUTH TOKEN
        const res = await fetch(`/api/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (res.status === 200) {
            localStorage.setItem('TOKEN', data.token)
            dispatch(getToken(data.token))
            dispatch(setAuth(true))

            // GETTING AUTH USER DATA
            const userRes = await fetch(`/api/auth`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('TOKEN')
                }
            })

            const userData = await userRes.json()
            if (userRes.status === 200) {
                notify("User Login Successful 🎉")
                dispatch(setCurrentUser(userData.user))
                history.push('/')
            }

        } else {
            const [msg] = data.errors
            notify(msg.msg)
        }
    }

    return (
        <Log>
            <Container>
                <Box>
                    <h1>Welcome to DEV Community</h1>
                    <h3>DEV Community is a community of 653,167 amazing developers</h3>
                    {/* <Signin>
                        <button className="create"> <i className="fab fa-github"></i> &nbsp; Continue with GitHub</button>
                        <button className="create"><i className="fab fa-google"></i> &nbsp; Continue with Google</button>
                    </Signin> */}
                    {/* <h2>Have a password? Continue with your email address</h2> */}
                    <Form onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" onChange={e => setEmail(e.target.value)} />
                        <label>Password</label>
                        <input type="password" onChange={e => setPassword(e.target.value)} />
                        <button className="create" type='submit' >Continue</button>
                    </Form>
                    <h2 style={{ color: "#3B49DF" }}>I forgot my password</h2>
                </Box>
                <h3>Open Source 😎· Free Forever 💖 <br />
                    We strive for transparency and don't collect excess data.</h3>
                <ToastContainer
                    position="bottom-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Container>
        </Log>
    )
}

const Log = styled.div`
    background: #EEF0F1;
    height: 100vh;
    width: 100%;
`

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    & > h3 {
        font-size: 1.5rem;
        color: grey;
        font-weight: 400;
        text-align: center;
        margin-top: 4rem;
    }
`

const Box = styled.div`
    margin: 0rem auto;
    width: 50%;
    height: max-content;
    padding: 3rem 2rem;
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    text-align: center;
    position: relative;

    @media (max-width: 768px) {
        width: 90%;
    }

    & > h1 {
        font-size: 3rem;
    }

    & > h2 {
        font-weight: 300;
    }
`

// const Signin = styled.div`
//     margin: 1rem 0;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;

//     & > .create {
//         font-size: 1.5rem;
//         border: none;
//         background: #191919;
//         padding: 1rem;
//         border-radius: .5rem;
//         outline: none;
//         color: #fff;
//         font-family: inherit;
//         margin: 1rem 1rem;
//         width: 80%;
//         cursor: pointer;
//     }
// `

const Form = styled.form`

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    margin: 2rem auto;

    & > label {
        font-size: 1.5rem;
        margin: 1rem 0;
    }

    & > input {
        padding: 1rem;
        width: 100%;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #191919;
    }

    & > .create {
        font-size: 1.5rem;
        border: none;
        background: #3B49DF;
        padding: 1rem;
        border-radius: .5rem;
        outline: none;
        color: #fff;
        font-family: inherit;
        margin-top: 2rem;
        width: 100%;
        cursor: pointer;
    }
`

export default Login
