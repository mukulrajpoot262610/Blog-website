import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'

const ProfilePost = ({ data }) => {

    const history = useHistory()
    const { title, name, avatar, date, _id } = data

    const handleDelete = async () => {
        const res = await fetch(`/api/blogs/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('TOKEN')
            },
        })

        const data = await res.json()
        if (res.status === 200) {
            alert('Your Post Is deleted')
            history.push('/')
        } else {
            const [msg] = data.errors
            alert(msg.msg)
        }
    }

    return (
        <Box>
            <Data>
                <UserProfile>
                    <img src={avatar} alt="" />
                    <section>
                        <h1>{name}</h1>
                        <h3>{date}</h3>
                    </section>
                </UserProfile>
                <Topic>
                    <Link to={`/post/${_id}`}>
                        <h1>{title}</h1>
                    </Link>
                    {/* <Tags>
                        <h2>#Web dev</h2>
                        <h2>#Web dev</h2>
                        <h2>#Web dev</h2>
                        <h2>#Web dev</h2>
                    </Tags> */}
                </Topic>
                <Interact>
                    <LikeComment>
                        <Comment>
                            <i className="far fa-comment"></i>
                            <h2>Add Comments</h2>
                        </Comment>
                    </LikeComment>
                    <Save onClick={handleDelete}>
                        Delete Post
                    </Save>
                </Interact>
            </Data>
        </Box>
    )
}

const Box = styled.div`
    background-color: #fff;
    margin-bottom: 1rem;
    width: 100%;
    height: 100%;
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);

    & > img {
        border-radius: .5rem;
        width: 100%;
    }
`

const Data = styled.div`
    padding: 1rem 2rem;
`
const UserProfile = styled.div`
    display: flex;
    align-items: center;

    & > img {
        border-radius: 50%;
        height: 3.5vh;
    }

    & > section {
        margin: 0 1rem;

        & > h1,h3 {
        font-weight: 300;
        }
    }
`

const Topic = styled.div`
    margin: 2rem;

    & > a {
        text-decoration: none;
    }

    & > a > h1 {
        font-size: 2.5rem;
        color: #191919;
    }
`

// const Tags = styled.div`
//     margin: 1rem 0;
//     display: flex;

//     & > h2 {
//         margin: 0 0.5rem;
//         font-weight: 400;
//         color: rgba(0,0,0,0.5);
//     }
// `

const Interact = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const LikeComment = styled.div`
    display: flex;
    align-items: center;
    margin: 0 2rem;
`
const Comment = styled.div`
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover{
        background: rgba(0,0,0,0.1);
    }

    & > i {
        font-size: 2rem;
        margin: 0 .5rem;
    }
`

const Save = styled.div`
    padding: 1rem;
    color: #fff;
    border-radius: 0.5rem;
    background: crimson;
    font-size: 1.3rem;
    cursor: pointer;
`

export default ProfilePost
