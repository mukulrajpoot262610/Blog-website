import React from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux'

const Comment = ({ data, post_id, setDel }) => {

    const [currentuser] = useSelector(state => state.currentUser)
    const { name, avatar, text, date, _id, user } = data

    const handleDelete = async () => {
        const res = await fetch(`/api/blogs/comments/${post_id}/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localStorage.getItem('TOKEN')
            },
        })

        const data = await res.json()
        if (res.status === 200) {
            setDel(uuidv4())
            // alert('Your Comment Is deleted')
        } else {
            const [msg] = data.errors
            alert(msg.msg)
        }
    }

    return (
        <Com>
            <img src={avatar} alt="" />
            <Box>
                <Wrapper>
                    <Name>{name} <span>{date.replace('T', ' ').slice(0, -5)}</span></Name>
                    <Text>{text}</Text>
                </Wrapper>
                {
                    currentuser && currentuser._id === user ? <Save onClick={handleDelete}>Delete Post</Save> : ""
                }

            </Box>
        </Com>
    )
}

const Com = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    width: 100%;

    & > img {
        height: 5vh;
        border-radius: 50%;
        margin-right: 2rem;
    }
`

const Box = styled.div`
    width: 100%;
    height: max-content;
    border-radius: .5rem;
    padding: 2rem;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    font-size: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
`

const Wrapper = styled.div`
    width: 100%;
`

const Name = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;


    & > span {
        font-size: 1.2rem;
        font-weight: 400;
    }

    `
const Text = styled.div`
    font-size: 1.5rem;
    margin: 1rem 2rem;
`

const Save = styled.div`
    padding: 1rem;
    color: #fff;
    border-radius: 0.5rem;
    background: crimson;
    font-size: 1.3rem;
    cursor: pointer;

`


export default Comment
