import React, { useEffect, useState } from 'react'
import { Container,PostForm } from '../component'
import { useParams } from 'react-router-dom'
import dbStore from '../appwrite/config'


const EditPost = () => {
    const [post,setPost] = useState()
    const {id} = useParams()

    useEffect(()=>{
      dbStore.getPost(id).then((posts)=>{
        if(posts){
          setPost(posts)
        }
      })
    },[id])

  return post ? (
    <Container>
        <PostForm post = {post}/>
    </Container>
  ):null
}

export default EditPost