import React from 'react'
import styled from 'styled-components'

const Button = ({ text }) => {
    return (
        <Btn className="create">{text}</Btn>
    )
}

const Btn = styled.button`
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
`

export default Button
