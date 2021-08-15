import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProfilePost from '../components/ProfilePost'
import Button from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { getCurrentUserProfile } from '../store/store'
import { useDispatch } from 'react-redux'

const Userprofile = () => {

    const history = useHistory()
    const [apiData, setApiData] = useState(null)
    const dispatch = useDispatch()
    const [blogpost, setBlogpost] = useState()

    useEffect(() => {
        const fn = async () => {
            // GETTING AUTH USER DATA
            const userRes = await fetch(`/api/profile/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('TOKEN')
                }
            })

            const userData = await userRes.json()
            if (userRes.status === 200) {
                setApiData(userData.profile)
                dispatch(getCurrentUserProfile(userData.profile))

                const userBlog = await fetch(`/api/blogs/user/${userData.profile.user._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-auth-token': localStorage.getItem('TOKEN')
                    }
                })

                const blogData = await userBlog.json()

                if (userBlog.status === 200) {
                    setBlogpost(blogData.post)
                }

            } else if (userRes.status === 400) {
                const [msg] = userData.errors
                alert(msg.msg)
                history.push('/settings')
            }
        }

        fn()
    }, [history, dispatch])

    const renderIt = <Profile>
        <div className="background"></div>
        <Container>
            <Userdata>
                <img src={apiData && apiData.user.avatar} alt="" />
                <Btn>
                    <Link to="/settings">
                        <Button className="btn" text="Edit Profile" />
                    </Link>
                </Btn>
                <UserName>{apiData && apiData.user.name}</UserName>
                <Bio>{apiData && apiData.bio !== "" ? apiData.bio : "404 bio not found"}</Bio>
                <Joined>
                </Joined>
                <hr />
                <Wrapper>
                    <Work><h1>Work</h1>{apiData ? apiData.status : '--'}</Work>
                    <Work><h1>Website</h1>{apiData && (apiData.website ? apiData.website : '--')}</Work>
                </Wrapper>
            </Userdata>
            <PostWrapper>
                <Data>
                    <li> <i className="fas fa-city"></i> &nbsp;{ } Post Published ({blogpost && blogpost.length})</li>
                </Data>
                <PostContainer>
                    {
                        blogpost && blogpost.map((e) => <ProfilePost data={e} key={e._id} />)
                    }
                </PostContainer>
            </PostWrapper>
        </Container>
    </Profile>

    return (renderIt)
}


const Profile = styled.div`
    width: 100%;
    min-height: 100vh;
    padding-top: 10vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #EEF0F1;
    position: relative;

    & > .background {
        position: absolute;
        height: 20vh;
        width: 100%;
        top: 0;
        /* z-index: 10; */
        background-color: #191919;
    }
`

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    min-height: max-content;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 3rem;
`

const Userdata = styled.div`
    position: relative;
    width: 100%;
    height: max-content;
    border-radius: .5rem;
    padding: 2rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > img {
        height: 10vh;
        width: 10vh;
        border-radius: 50%;
        border: 1rem solid #191919;
        position: fixed;
        top: 7.5%;
    }

    @media (max-width: 768px) {
        align-items: flex-start;
    }

`

const Btn = styled.div`
    position: absolute;
    left: 85%;

    @media (max-width: 768px) {
        left: 72%;
    }
`

const UserName = styled.div`
    font-size: 3rem;
    margin-top: 5rem;
    font-weight: 600;
`
const Bio = styled.div`
    font-size: 2rem;
    font-weight: 400;
    margin: 2rem 0;
`
const Joined = styled.div`
    font-size: 1.5rem;
    font-weight: 400;
`
const Work = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-top: 1px solid gray;
    padding: 2rem;

    & > h1 {
        font-size: 2rem;
        color: grey;
    }
    font-size: 1.5rem;
    font-weight: 400;
`


const Wrapper = styled.section`
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PostWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 1rem 0;
`

const Data = styled.ul`
    height: 100%;
    border-radius: .5rem;
    padding: 1.5rem 0;
    width: 30%;
    margin-right: 1rem;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);

    @media (max-width: 768px) {
        display: none;
    }

    & > li {
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

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
`

export default Userprofile
