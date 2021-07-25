import React from 'react'
import styled from 'styled-components'

const Contacts = () => {
    return (
        <Log>
            <Container>
                <Box>
                    <h1>Contacts</h1>
                    <p>DEV Community would love to hear from you!</p>

                    <p>Email: <a href="mailto: yo@dev.to">yo@dev.to 😁</a></p>

                    <p>Twitter: <a href="https://twitter.com/thepracticaldev">@thepracticaldev 👻</a></p>

                    <hr />

                    <p>This Site is cloned by <a href="https://www.linkedin.com/in/mukul-rajpoot-262610/">Mukul Rajpoot 😎</a></p>

                    <p>Email:<a href="mailto: mukulrajpoot262610@gmail.com"> mukulrajpoot262610@gmail.com 📧</a></p>

                    <p>Happy coding ❤️</p>
                </Box>
                <h3>Open Source 😎· Free Forever 💖 <br />
                    We strive for transparency and don't collect excess data.</h3>
            </Container>
        </Log >
    )
}

const Log = styled.div`
    background: #EEF0F1;
    min-height: 100vh;
    width: 100%;
`

const Container = styled.div`
    max-width: 1280px;
    width: 100%;
    padding: 10vh 0;
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
    background-color: #fff;
    margin: 0rem auto;
    width: 80%;
    height: max-content;
    padding: 5rem;
    border-radius: .5rem;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
    position: relative;

    @media (max-width: 768px) {
        width: 90%;
    }

    & > h1 {
        font-size: 4rem;
    }

    & > p {
        font-size: 2rem;
        margin: 2rem 0;

        & > a {
            text-decoration: none;
            color: royalblue;
            font-weight: 600;
            font-size: 2.5rem;

            @media (max-width: 768px) {
            font-size: 2rem;
            }
        }
    }

    & > h2 {
        font-weight: 300;
        background-color: #EEF0F1;
    }

    & > img {
        border-radius: 0.5rem;
        margin: 2rem 0;
    }
`


export default Contacts
