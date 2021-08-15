import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Comment from '../components/Comment'
import ReactMarkdown from 'react-markdown'

const Post = () => {

    const auth = useSelector(state => state.isAuthenticated)
    const [user] = useSelector(state => state.currentUser)

    const [postData, setPostData] = useState()
    const [like, setLike] = useState()
    const [profileData, setProfileData] = useState()
    const [comments, setComments] = useState("")
    const [commentData, setCommentData] = useState()
    const [del, setDel] = useState()

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('TOKEN')
                },
            })

            const data = await res.json()

            if (res.status === 200) {
                setPostData(data.post)
                setLike(data.post.likes)
                setCommentData(data.post.comments)
                const userRes = await fetch(`/api/profile/${data.post.user}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'x-auth-token': localStorage.getItem('TOKEN')
                    }
                })

                const userData = await userRes.json()
                if (userRes.status === 200) {
                    const [userProfile] = userData.profile
                    setProfileData(userProfile)
                }

            } else {
                const [msg] = data.errors
                alert(msg.msg)
            }
        }
        fetchData()
    }, [del, id])

    const handleLike = async () => {
        const res = await fetch(`/api/blogs/like/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('TOKEN')
            },
        })

        const data = await res.json()

        if (res.status === 200) {
            setLike(data)
        } else {
            const [msg] = data.errors
            console.log(msg.msg)

            const resUnlike = await fetch(`/api/blogs/unlike/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-auth-token': localStorage.getItem('TOKEN')
                },
            })

            const dataUnlike = await resUnlike.json()

            if (resUnlike.status === 200) {
                setLike(dataUnlike)
            } else {
                alert('Please Sign-in First')
                history.push('/enter')
            }
        }
    }

    const handleComments = async (e) => {
        e.preventDefault()

        const formData = {
            text: comments,
        }

        const resComment = await fetch(`/api/blogs/comments/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('TOKEN')
            }, body: JSON.stringify(formData)
        })

        const dataComment = await resComment.json()

        if (resComment.status === 200) {
            setComments("")
            setCommentData(dataComment)
        } else if (resComment.status === 401) {
            alert('Please Sign-in First')
            history.push('/enter')
        } else {
            alert('Text is Required')
        }

        setComments('')
    }


    return (
        <Home>
            <Container>
                <Left>
                    <SideNav>
                        <li onClick={e => handleLike()} title="Like">{
                            like && like.filter(u => (user && user._id) === u.user).length > 0 ? (<><i className="fas fa-heart" style={{ color: 'crimson' }}></i> <span>{like && like.length}</span></>) : (<><i className="far fa-heart" style={{ color: 'crimson' }}></i><span>{like && like.length}</span></>)
                        }</li>

                        <li title="Comment">📝<span>{commentData && commentData.length}</span></li>
                        <li title="Share">🏹</li>
                    </SideNav>
                </Left>
                <Middle>
                    <Posts>
                        <img src={postData && postData.postImage} alt="" />
                        <PostData>
                            <h1>{postData && postData.title} </h1>
                            <Userdetails>
                                <img src={postData && postData.avatar} alt="" />
                                {postData && postData.name}
                            </Userdetails>
                            <ReactMarkdown className="markdown">
                                {postData && postData.text}
                            </ReactMarkdown>
                        </PostData>
                    </Posts>
                    <hr />
                    <Discussion id='#com'>
                        <h1>Discussion ({commentData && commentData.length}) </h1>
                        <Field>
                            {
                                auth ? <img src={user && user.avatar} alt="" /> : <img src="/images/logo.png" alt="" />
                            }
                            <form onSubmit={handleComments}>
                                <textarea placeholder="Write your Amazing Words..." onChange={(e) => setComments(e.target.value)} value={comments} required></textarea>
                                <button className="create">Submit</button>
                            </form>
                        </Field>
                        <Panel>
                            {
                                commentData && commentData.map((e) => <Comment setDel={setDel} post_id={id} data={e} key={e._id} />)

                            }
                        </Panel>
                    </Discussion>
                </Middle>
                <Right>
                    <Profile>
                        <div className="background"></div>
                        <Userdata>
                            <img src={postData && postData.avatar} alt="" />
                            <UserName>{postData && postData.name}</UserName>
                            <Bio>{profileData && profileData.bio}</Bio>
                            <h3>WORK</h3>
                            <h5>{profileData && profileData.status}</h5>
                            <h3>LOCATION</h3>
                            <h5>{profileData && profileData.location}</h5>
                            <h3>Website</h3>
                            <a href={profileData && profileData?.website}><h5>Go to</h5></a>
                        </Userdata>
                    </Profile>
                </Right>
            </Container>
        </Home>
    )
}

const Profile = styled.div`
    padding-top: 5vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: #EEF0F1;
    position: relative;

    & > .background {
        border-radius: 0.5rem;
        position: absolute;
        height: 10vh;
        width: 100%;
        top: 0;
        /* z-index: 10; */
        background-color: #191919;
    }
`

const Userdata = styled.div`
    position: relative;
    width: 100%;
    height: max-content;
    border-radius: .5rem;
    padding: 1.5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > img {
        height: 7vh;
        width: 7vh;
        border-radius: 50%;
        border: 5px solid #191919;
        position: absolute;
        top: -15%;
    }

    & > h3 {
        font-size: 1.3rem;
        color: gray;
    }

    & > h5 {
        font-size: 1.2rem;
        font-weight: 400;
        color: #191919;
    }

    & > a {
        & > h5 {
            font-size: 1.2rem;
            font-weight: 400;
            color: #191919;
        }
        text-decoration: none;
    }
`

const Userdetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 2rem 0 5rem 0;
    font-size: 1.6rem;

    & > img {
        height: 4vh;
        margin-right: 2rem;
        border-radius: 50%;
    }
`

const Home = styled.div`
    height: max-content;
    width: 100%;
    padding-top: 7vh;
    background-color: #EEF0F1;
`;

const UserName = styled.div`
    font-size: 2rem;
    margin-top: 4rem;
    font-weight: 600;
`
const Bio = styled.div`
    font-size: 1.5rem;
    font-weight: 400;
    margin: 1rem 0;
    color: gray;
`

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
`

const Left = styled.div`
    padding: .5rem;
    flex: 0.2;
    min-height: 100vh;

    @media (max-width: 768px) {
        height: max-content;
        flex: 0;
        padding: 0;
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

const Posts = styled.div`
    min-height: 50vh;
    width: 100%;
    border-radius: .5rem;
        padding: 2rem;
        background-color: #fff;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);

    & >  img {
        border-radius: .5rem;
        width: 100%;
        height: 50vh;
        object-fit: cover;
    }
`

const PostData = styled.div`
    min-height: 50vh;
    width: 100%;
    padding: 2rem;
    margin-bottom: 3rem;

      & > h1 {
        margin: 2rem 0;
        font-size: 5rem;
    }

    & > .markdown {
        margin-left: 2rem;
    }
        font-size: 2rem;
`;

const SideNav = styled.ul`
    height: max-content;
    border-radius: .5rem;
    padding: 1.5rem 0;

    @media (max-width: 768px) {
        background: #fff;
        padding: 0;
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    & > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        list-style: none;
        width: 100%;
        padding: 1rem 2rem;
        border-radius: .5rem;
        font-size: 3rem;
        cursor: pointer;
        margin: 2rem 0;

        & > span {
            font-size: 2rem;
        }

        &:hover {
            background-color: rgba(0,0,0,0.1);
            color: #3B49D2;
        }
    }
`

const Discussion = styled.div`
    margin: 2rem 0;
    margin-bottom: 10rem;
`

const Field = styled.div`
    margin: 4rem 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    & > img {
        height: 5vh;
        border-radius: 50%;
        margin-right: 2rem;
    }

    & > form {
        flex: 2;

        & > .create {
        font-size: 1.5rem;
        border: none;
        margin-top: 1rem;
        background: #3B49DF;
        padding: 1rem;
        border-radius: .5rem;
        outline: none;
        color: #fff;
        font-family: inherit;
        cursor: pointer;
    }
    }

    textarea {
        width: 100%;
        height: 13vh;
        border-radius: .5rem;
        padding: 2rem;
        background-color: #fff;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        font-size: 2rem;
    }
`
const Panel = styled(Field)`
    flex-direction: column;
`

export default Post
