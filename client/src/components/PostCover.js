import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PostCover = ({ data }) => {

    const { name, avatar, date, title, _id, likes, comments, postImage } = data

    const [user] = useSelector(state => state.currentUser)

    return (
        <Box>
            <Link to={`/post/${_id}`}>
                <img src={postImage} alt="" />
            </Link>
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
                        <Link to={`/post/${_id}`}>
                            <Like>
                                {
                                    likes.filter(u => (user && user._id) === u.user).length > 0 ? <i className="fas fa-heart" style={{ color: 'crimson' }}></i> : <i className="far fa-heart" style={{ color: 'crimson' }}></i>
                                }
                                <h2>{likes.length} Reactions</h2>
                            </Like>
                            <Comment>
                                <i className="far fa-comment"></i>
                                <h2>{comments.length} Comments</h2>
                            </Comment>
                        </Link>
                    </LikeComment>
                </Interact>
            </Data>
        </Box>
    )
}

const Box = styled.div`
    margin-bottom: 1rem;
    width: 100%;
    height: max-content;
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    background-color: #fff;

    & > a {
        text-decoration: none;
    }

    & > a > img {
        border-radius: .5rem;
        width: 100%;
        height: 30vh;
        object-fit: cover;
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
        color: #191919;
    }

    & > a > h1 {
        font-size: 3rem;
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
    & > a {
        color: #191919;
    text-decoration: none;
    display: flex;
    align-items: center;
    margin: 0 2rem;
}
`
const Comment = styled.div`
    display: flex;
    align-items: center;
    margin: 0 2rem;
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
const Like = styled.div`
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
// const Save = styled.div`
//     padding: 1rem;
//     border-radius: 0.5rem;
//     background: rgba(0,0,0,0.2);
//     font-size: 1.3rem;
//     cursor: pointer;
// `

export default PostCover
