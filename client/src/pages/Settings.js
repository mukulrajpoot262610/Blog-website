import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Settings = () => {

    const history = useHistory()
    window.document.title = "Settings - DEV Community 👨‍💻👩‍💻"

    const state = useSelector(state => state.isAuthenticated)
    const [token] = useSelector(state => state.token)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [company, setCompany] = useState()

    const [website, setWebsite] = useState()
    const [location, setLocation] = useState()
    const [bio, setBio] = useState()
    const [status, setStatus] = useState()
    const [skills, setSkills] = useState()

    const [school, setSchool] = useState()
    const [degree, setDegree] = useState()
    const [fieldofstudy, setFieldofstudy] = useState()

    const [youtube, setYoutube] = useState()
    const [github, setGithub] = useState()
    const [twitter, setTwitter] = useState()
    const [facebook, setFacebook] = useState()
    const [linkedin, setLinkedin] = useState()
    const [instagram, setInstagram] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = { name, email, company, website, location, bio, status, skills, school, degree, fieldofstudy, youtube, github, twitter, facebook, linkedin, instagram }

        const res = await fetch(`/api/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        if (res.status === 200) {
            alert('Success')
            history.push('/user')
        } else {
            const [msg] = data.errors
            alert(msg.msg)
        }
    }

    return (
        <Home>
            {
                state ? <Container>
                    <Middle>
                        <FilterOption>
                            {/* <h1>Settings for <Link to="/user/mukulrajpoot">@{user.name.replace(' ', '').toLowerCase()}</Link></h1> */}
                        </FilterOption>
                        <Posts>
                            <Form onSubmit={handleSubmit}>
                                <SettingBox>
                                    <h1>User</h1>
                                    <label>Name</label>
                                    <input type="text" placeholder="John Doe" onChange={e => setName(e.target.value)} required />
                                    <label>Email</label>
                                    <input type="email" placeholder="john.doe@example.com" onChange={e => setEmail(e.target.value)} required />
                                    <label>Company</label>
                                    <input type="text" placeholder="abc.com" onChange={e => setCompany(e.target.value)} />
                                </SettingBox>
                                <SettingBox>
                                    <h1>Basic</h1>
                                    <label>Website URL</label>
                                    <input type="text" placeholder="https://yoursite.com" onChange={e => setWebsite(e.target.value)} />
                                    <label>Location</label>
                                    <input type="text" placeholder="halifax, Nova Prime" onChange={e => setLocation(e.target.value)} />
                                    <label>Bio</label>
                                    <input type="text" placeholder="A short bio..." onChange={e => setBio(e.target.value)} required />
                                    <label>Status</label>
                                    <input type="text" placeholder="Status" onChange={e => setStatus(e.target.value)} required />
                                    <label>Skills</label>
                                    <input type="text" placeholder="Javascript, Python..." onChange={e => setSkills(e.target.value)} required />
                                </SettingBox>
                                <SettingBox>
                                    <h1>Education</h1>
                                    <label>School</label>
                                    <input type="text" placeholder="Abc School" onChange={e => setSchool(e.target.value)} />
                                    <label>Degree</label>
                                    <input type="text" placeholder="Masters in ABC" onChange={e => setDegree(e.target.value)} />
                                    <label>Field Of Study</label>
                                    <input type="text" onChange={e => setFieldofstudy(e.target.value)} />
                                </SettingBox>
                                <SettingBox>
                                    <h1>Socials</h1>
                                    <label><i className="fab fa-youtube"></i> Youtube</label>
                                    <input type="text" placeholder="https://www.youtube.com/" onChange={e => setYoutube(e.target.value)} />
                                    <label><i className="fab fa-github"></i> GitHub</label>
                                    <input type="text" placeholder="https://www.github.com/" onChange={e => setGithub(e.target.value)} />
                                    <label><i className="fab fa-twitter"></i> Twitter</label>
                                    <input type="text" placeholder="https://www.twitter.com/" onChange={e => setTwitter(e.target.value)} />
                                    <label><i className="fab fa-facebook"></i> Facebook</label>
                                    <input type="text" placeholder="https://www.facebook.com/" onChange={e => setFacebook(e.target.value)} />
                                    <label><i className="fab fa-linkedin"></i> LinkedIn</label>
                                    <input type="text" placeholder="https://www.linkedin.com/" onChange={e => setLinkedin(e.target.value)} />
                                    <label><i className="fab fa-instagram"></i> Instagram</label>
                                    <input type="text" placeholder="https://www.instagram.com/" onChange={e => setInstagram(e.target.value)} />
                                </SettingBox>
                                <SettingBox>
                                    <input type='submit' className="create" />
                                </SettingBox>
                            </Form>
                        </Posts>
                    </Middle>
                </Container> : window.history.replaceState(null, "", "http://localhost:3000/enter")
            }
        </Home>
    )
}

const Home = styled.div`
    height: max-content;
    width: 100%;
    padding-top: 7vh;
    background-color: #EEF0F1;
`;

const Container = styled.div`
    max-width: 1080px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
    display: flex;
`

const Middle = styled.div`
    padding: .5rem;
    min-height: 100vh;
    flex: 4;

    @media (max-width: 1024px) {
        padding: 2rem;
        width: 100%;
        margin: 0 auto;
    }
`

const FilterOption = styled.div`
    height: max-content;
    padding: 1rem;
    width: 100%;
    border-radius: .5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > h1 {
        & > a {
            text-decoration: none;
            color: #3B49DF;
        }
    }
`


const Posts = styled.div`
    min-height: 100vh;
    width: 100%;
`

// const SideNav = styled.ul`
//     height: max-content;
//     border-radius: .5rem;
//     padding: 1.5rem 0;

//     & > li {
//         list-style: none;
//         width: 100%;
//         padding: 1rem 2rem;
//         border-radius: .5rem;
//         font-size: 1.5rem;
//         cursor: pointer;

//         &:hover {
//             background-color: rgba(0,0,0,0.1);
//             color: #3B49D2;
//         }
//     }
// `

const SettingBox = styled.div`
    margin-bottom: 2rem;
    width: 100%;
    height: max-content;
    border-radius: .5rem;
    padding: 3rem;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.3);

    & > h1 {
        margin-bottom: 2rem;
    }

    & > label {
        font-size: 1.5rem;
        margin-top: 2rem;
        margin: 1rem 0;
    }

    & > input {
        padding: 1rem;
        width: 100%;
        font-size: 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
        border: 1px solid #B5BDC4;
        background-color: #F9FAFA;
    }

    & > .create {
        font-size: 1.5rem;
        border: none;
        background: #3B49DF;
        padding: 1rem;
        border-radius: .5rem;
        outline: none;
        color: #fff;
        font-family: inherit;
        margin-top: 2rem;
        width: 100%;
        cursor: pointer;
    }

`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    margin: 0 auto;

    @media (max-width: 768px) {
        width: 100%;
    }
`

export default Settings
