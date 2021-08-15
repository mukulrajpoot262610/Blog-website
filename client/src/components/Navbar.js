import React, { useEffect, useState } from 'react'
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

    const [toggle, SetToggle] = useState(false)

    useEffect(() => {
        return history.listen((location) => {
            SetToggle(false)
        })
    }, [history])

    const handleNav = () => {
        SetToggle(!toggle)
    }

    return (
        <Nav>
            <Container>
                <Logo>
                    <div onClick={handleNav}>
                        <i className="fas fa-bars"></i>
                    </div>
                    <Link to="/">
                        <img src="/images/logo.png" alt="Logo" />
                    </Link>
                </Logo>
                {
                    toggle && <><SideNav>
                        <Link to="/">
                            <li>🏡 Home</li>
                        </Link>
                        <Link to="/about">
                            <li>🐒 About</li>
                        </Link>
                        <Link to="/">
                            <li> 👀 Terms of use</li>
                        </Link>
                        <Link to='/contacts'>
                            <li>📞 Contact</li>
                        </Link>
                        <h1>Social</h1>
                        <a href="https://www.linkedin.com/in/mukul-rajpoot-262610/">
                            <li><i className="fab fa-linkedin-in"></i>&nbsp; LinkedIn</li>
                        </a>
                        <a href="https://github.com/mukulrajpoot262610">
                            <li><i className="fab fa-github"></i>&nbsp; GitHub</li>
                        </a>
                    </SideNav>
                    </>
                }
                {
                    user[0] ? (<CreatePost>
                        <Link to="/new">
                            <Button text="Create Post" />
                        </Link>
                        <Link to="/soon">
                            <i className="far fa-comment-dots"></i>
                        </Link>
                        <Link to="/soon">
                            <i className="far fa-bell"></i>
                        </Link>
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
    position: relative;
    max-width: 1280px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const SideNav = styled.ul`
    position: absolute;
    top: 100%;
    width: 40%;
    height: 100vh;
    border-radius: .5rem;
    padding: 1.5rem 0;
    background-color: #fff;
    font-size: 2rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);

    & > h1 {
        margin: 2rem 0;
        margin-left: 2rem;
    }

    & > a {
        text-decoration: none;
        color: #191919;
    }

    & > a > li {
        list-style: none;
        width: 100%;
        padding: 1rem 2rem;
        border-radius: .5rem;
        font-size: 2rem;
        cursor: pointer;

        &:hover {
            background-color: rgba(0,0,0,0.1);
            color: #3B49D2;
        }
    }
`

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        margin-left: 2rem;
        display: none;

        @media (max-width:768px) {
            display: block;
        }
    }

    & > div > i {
        font-size: 3rem;
        cursor: pointer;
    }

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

    & > a > i {
        font-size: 2.5rem;
        padding: 1rem;

        &:hover {
            border-radius: 50%;
            background-color: rgba(0,0,0,0.1);
        }
    }
`

export default Navbar
