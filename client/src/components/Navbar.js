import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from './Button'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const Navbar = () => {

    const history = useHistory()
    const user = useSelector(state => state.currentUser)

    const handleLogout = () => {
        localStorage.removeItem('TOKEN')
        window.location.reload()
        history.pushState('/')
    }

    return (
        <Nav>
            <Container>
                <Logo>
                    <Link to="/">
                        <img src="/images/logo.png" alt="Logo" />
                    </Link>
                </Logo>
                {
                    user[0] ? (<CreatePost>
                        <Link to="/new">
                            <Button text="Create Post" />
                        </Link>
                        <i className="far fa-comment-dots"></i>
                        <i className="far fa-bell"></i>
                        <img src={user[0].avatar} alt="/" />
                        <Dropdown>
                            <Link to="/user">
                                <h1>{user[0].name}</h1>
                                <h3>@{user[0].name.replace(' ', '').toLowerCase()}</h3>
                            </Link>
                            <hr />
                            <Navigation>
                                <Link to="/user">
                                    <li>🏡 Dashboard</li>
                                </Link>
                                <Link to="/new">
                                    <li>🥇 Create Post</li>
                                </Link>
                                <Link to="/settings">
                                    <li>⚙ Settings</li>
                                </Link>
                            </Navigation>
                            <hr />
                            <h1 onClick={handleLogout} style={{ color: "#3b49df", fontWeight: "500", cursor: 'pointer' }}>Sign Out</h1>
                        </Dropdown>
                    </CreatePost>) : (<Signin>
                        <Link to="/enter">
                            <button className="login">Log in</button>
                        </Link>
                        <Link to="/register">
                            <button className="create">Create Account</button>
                        </Link>
                    </Signin>)
                }
            </Container>
        </Nav>
    )
}

const Nav = styled.nav`
    position: fixed;
    z-index: 100;
    background: #fff;
    height: 6vh;
    width: 100%;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
`

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > a > img {
        height: 5vh;
        margin: 0 2rem;
    }
`

const Signin = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > a > .login {
        border: none;
        background: none;
        outline: none;
        color: #3B49DF;
        font-family: inherit;
        font-size: 1.5rem;
        cursor: pointer;
    }

    & > a > .create {
        font-size: 1.5rem;
        border: none;
        background: #3B49DF;
        padding: 1rem;
        border-radius: .5rem;
        outline: none;
        color: #fff;
        font-family: inherit;
        margin: 0 2rem;
        cursor: pointer;

        &:hover {
            background: #3B49D2;
        }
    }
`

const Dropdown = styled.div`
    display: none;
    width: 90%;
    height: max-content;
    border: 1px solid #191919;
    background: #fff;
    border-radius: 0.5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    position: absolute;
    top: 120%;
    padding: 1.5rem 1rem;
    transition: all 2s ease;

    & > a {
        text-decoration: none;
        color: #191919;
    }

    & > a > h3 {
        margin-left: 0.5rem;
        font-weight: 500;
    }

    & > hr {
        margin: 1rem 0;
    }

    &:hover{
        display: block;
    }
`;

const Navigation = styled.ul`
    height: max-content;
    border-radius: .5rem;

    & > a {
        text-decoration: none;
        color: #191919;
    }

    & > a > li {
        list-style: none;
        width: 100%;
        padding: 1rem 1rem;
        border-radius: .5rem;
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            background-color: rgba(0,0,0,0.1);
            color: #3B49D2;
        }
    }
`

const CreatePost = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-right: 1rem;
    transition: all 2s ease;

    & > img {
        border-radius: 50%;
        height: 4vh;
        margin-left: 1rem;
    }

    &:hover {
        transition: all 2s ease;
        ${Dropdown} {
                transition: all 2s ease;
                display: block;
        }
    }

    & > i {
        font-size: 2.5rem;
        padding: 1rem;

        &:hover {
            border-radius: 50%;
            background-color: rgba(0,0,0,0.1);
        }
    }
`

export default Navbar
