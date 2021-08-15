import React, { useState } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom'
import storage from '../Firebase.config'

const AddPost = () => {

    const [post, setPost] = useState()
    const [title, setTitle] = useState()
    const [fileName, setFileName] = useState()
    const history = useHistory()

    const handleFile = (e) => {
        setFileName(e.target.files[0])
    }


    const UploadToMongoDB = async (url) => {
        const formData = {
            text: post,
            title: title,
            postImage: url
        }

        const res = await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('TOKEN'),
            },
            body: JSON.stringify(formData)
        })

        // const data = await res.json()

        if (res.status === 400) {
            alert('Error')
        } else {
            alert('Success')
            history.push('/')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        upload([
            { file: fileName, label: 'postImage' }
        ])
    }

    const upload = (items) => {
        items.forEach(item => {
            const filename = new Date().getTime() + item.file.name;
            const uploadTask = storage.ref(`/items/${filename}`).put(item.file)

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                alert('Uploading')
            }, (err) => { console.log(err) }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then(url => {
                    UploadToMongoDB(url)
                })
            })
        })
    }

    return (
        <Home>
            <Container>
                <Left>
                    <SideNav>
                        <li>👻 Create A Post</li>
                    </SideNav>
                </Left>
                <Middle>
                    <Form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="postImage"
                            onChange={handleFile}
                        />
                        <input placeholder="Add your title here..." onChange={(e) => setTitle(e.target.value)} required />
                        <textarea placeholder="Write your Amazing Words..." onChange={(e) => setPost(e.target.value)} required></textarea>
                        <FilterOption2>
                            <button type='submit' className="create">Publish</button>
                        </FilterOption2>
                    </Form>
                </Middle>
            </Container>
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
    min-height: 93vh;
    margin: 0 auto;
    display: flex;
`

const Left = styled.div`
    padding: .5rem;
    flex: 1;
    min-height: 90vh;

    @media (max-width: 768px) {
        display: none;
    }
    `
const Middle = styled.div`
    padding: .5rem;
    min-height: 90vh;
    flex: 4;

    @media (max-width: 1024px) {
        padding: 2rem;
        margin: 0 auto;
    }
    `

const SideNav = styled.ul`
    height: max-content;
    border-radius: .5rem;
    padding: 1.5rem 0;

    & > li {
        list-style: none;
        width: 100%;
        padding: 1rem 2rem;
        border-radius: .5rem;
        font-size: 1.5rem;
        cursor: pointer;

        &:hover {
            background-color: rgba(0,0,0,0.1);
            color: #3B49D2;
        }
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin: 2rem 0;

    input {
        width: 100%;
        border-radius: .5rem;
        padding: 3rem;
        background-color: #fff;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        font-size: 2rem;
        font-family: 'Source Code Pro', monospace;
    }

    textarea {
        width: 100%;
        height: 60vh;
        border-radius: .5rem;
        padding: 3rem;
        background-color: #fff;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.3);
        font-size: 2rem;
    }
`
const FilterOption = styled.div`
    height: max-content;
    width: 100%;
    border-radius: .5rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > h1 {
        padding: 1rem;
        margin-left: 2rem;
        border-radius: .5rem;
        cursor: pointer;
        background-color: rgba(0,0,0,0.1);
        & > a {
            text-decoration: none;
            color: #3B49DF;
        }
    }
`

const FilterOption2 = styled(FilterOption)`
    justify-content: flex-start;

    & > h1 {
        margin-left: 0rem;
    }

    & > .create {
        font-size: 1.5rem;
        border: none;
        margin-top: 2rem;
        background: #3B49DF;
        padding: 1rem;
        border-radius: .5rem;
        outline: none;
        color: #fff;
        font-family: inherit;
        cursor: pointer;
    }
`

export default AddPost
