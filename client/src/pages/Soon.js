import React from 'react'
import styled from 'styled-components'

const Soon = () => {
    return (
        <Come>
            <Container>
                <Box>
                    Coming Soon ⌛
                </Box>
            </Container>
        </Come>
    )
}

const Come = styled.div`
    background: #EEF0F1;
    height: 100vh;
    width: 100%;
`


const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    & > h3 {
        font-size: 1.5rem;
        color: grey;
        font-weight: 400;
        text-align: center;
        margin-top: 4rem;
    }
`

const Box = styled.div`
    margin: 0rem auto;
    width: 50%;
    height: max-content;
    padding: 3rem 2rem;
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    text-align: center;
    font-size: 4rem;
    font-weight: 500;
    position: relative;

    @media (max-width: 768px) {
        width: 90%;
    }
`

export default Soon
