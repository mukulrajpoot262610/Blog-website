import React from 'react'
import styled from 'styled-components'

const About = () => {
    return (
        <Log>
            <Container>
                <Box>
                    <h1>About DEV</h1>
                    <p>DEV is a community of software developers getting together to help one another out. The software industry relies on collaboration and networked learning. We provide a place for that to happen.</p>

                    <p>Our application is open source, meaning you can inspect every little detail of the code, or chip in yourself! We are working to make our platform available for anyone to stand up similar communities in any niche or passion.</p>

                    <p>We believe in transparency and adding value to the ecosystem. We hope you poke around and like what you see!</p>
                    <h1>Leadership</h1>
                    <img src="/images/founder.jpg" alt="" />
                    <p>This company is led by Ben Halpern (Co-CEO), Jess Lee (COO) and Peter Frank (Co-CEO).</p>
                    <p>This Site is cloned by <a href="https://www.linkedin.com/in/mukul-rajpoot-262610/">Mukul Rajpoot</a></p>

                    <h1>Team</h1>
                    <img src="/images/team.png" alt="" />
                    <p>Our team is distributed around the world. We have no office, but we come together online each day to build community and improve the software careers of millions.</p>

                    <p>Happy coding ❤️</p>
                </Box>
                <h3>Open Source 😎· Free Forever 💖 <br />
                    We strive for transparency and don't collect excess data.</h3>
            </Container>
        </Log>
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
        }
    }

    & > h2 {
        font-weight: 300;
        background-color: #EEF0F1;
    }

    & > img {
        border-radius: 0.5rem;
        margin: 2rem 0;
        width: 100%;
        height: auto;
    }
`


export default About
