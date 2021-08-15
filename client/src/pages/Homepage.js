import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PostCover from '../components/PostCover'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Homepage = () => {

    const state = useSelector(state => state.isAuthenticated)

    const [allPost, setAllPost] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/blogs`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('TOKEN')
                },
            })

            const data = await res.json()
            if (res.status === 200) {
                setAllPost(data.post)
            } else {
                const [msg] = data.errors
                alert(msg.msg)
            }
        }

        fetchData()
    }, [])

    return (
        <Home>
            <Container>
                <Left>
                    {
                        state ? "" : (<Box>
                            <h1><span style={{ color: "#3B49DF" }}>DEV Community</span> is a community of 653,167 amazing developers</h1>
                            <h3>We're a place where coders share, stay up-to-date and grow their careers.</h3>
                            <Signin>
                                <Link to="/register">
                                    <button className="create">Create Account</button>
                                </Link>
                                <Link to="/enter">
                                    <button className="login">Log in</button>
                                </Link>
                            </Signin>
                        </Box>)
                    }
                    <SideNav>
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
                        <a href="mailto: mukulrajpoot262610@gmail.com">
                            <li><i className="fas fa-envelope"></i>&nbsp; Mail</li>
                        </a>
                    </SideNav>
                </Left>
                <Middle>
                    <FilterOption>
                        <h1>Posts</h1>
                        {/* <Filters>
                            <li>Feed</li>
                            <li>Month</li>
                            <li>Latest</li>
                        </Filters> */}
                    </FilterOption>
                    <Posts>
                        {
                            allPost && allPost.map((data) => <PostCover key={data._id} data={data} />)
                        }
                    </Posts>
                </Middle>
                <Right>
                    <Box>
                        <img src="/images/Codeland.png" alt="" />
                        <h1>The CodeLand CFP is open!</h1>
                        <a href="/">→ Submit a talk</a>
                    </Box>
                </Right>
            </Container>
        </Home>
    )
}

const Home = styled.div`
    height: max-content;
    width: 100%;
    padding-top: 7vh;
    background-color: #EEF0F1;
`;

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
`

const Left = styled.div`
    padding: .5rem;
    flex: 1;
    min-height: 100vh;

    @media (max-width: 768px) {
        display: none;
    }
`

const Middle = styled.div`
    padding: .5rem;
    min-height: 100vh;
    flex: 3;

    @media (max-width: 1024px) {
        padding: 2rem;
    }
    `

const Right = styled.div`
    padding: .5rem;
    min-height: 100vh;
    flex: 1;

    @media (max-width: 1024px) {
        display: none;
    }
`
const Box = styled.div`
    height: max-content;
    border-radius: .5rem;
    padding: 1.5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    background: #fff;

    & > a {
        color: #3B49DF;
        text-decoration: none;
        font-size: 1.4rem;
    }

    & > img {
        width: 25rem;
    }

    & > h1 {
        font-size: 2rem;
    }

    & > h3 {
        font-size: 1.3rem;
        margin: 1rem 0;
        font-weight: 300;
    }

`

const Signin = styled.div`
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
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
        margin: 1rem 0rem;
        width: 100%;
        cursor: pointer;

        &:hover {
            background: #3B49D2;
        }
    }
`
const FilterOption = styled.div`
    height: max-content;
    padding: 1rem;
    width: 100%;
    border-radius: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

// const Filters = styled.ul`
//     display: flex;
//     justify-content: space-between;
//     align-items: center;

//     & > li {
//         list-style: none;
//         font-size: 1.5rem;
//         padding: .5rem 1rem;
//         border-radius: .5rem;

//         &:hover {
//             background: rgba(59,73,210, 0.2);
//             padding: .5rem 1rem;
//         }
//     }
// `

const Posts = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: #EEF0F1;
`

const SideNav = styled.ul`
    height: max-content;
    border-radius: .5rem;
    padding: 1.5rem 0;

    & > h1 {
        margin: 2rem 0;
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
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            background-color: rgba(0,0,0,0.1);
            color: #3B49D2;
        }
    }
`

export default Homepage
