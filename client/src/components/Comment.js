import React from 'react'
import styled from 'styled-components'

const Comment = ({ data }) => {

    const { name, avatar, text, date } = data

    return (
        <Com>
            <img src={avatar} alt="" />
            <Box>
                <Name>{name} <span>{date.replace('T', ' ').slice(0, -5)}</span></Name>
                <Text>{text}</Text>
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
    `

const Name = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
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

export default Comment
