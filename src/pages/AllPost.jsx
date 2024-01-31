import React from 'react'
import {Container,PostCard} from "../component"
import dbStore from '../appwrite/config'
import { useState,useEffect } from 'react'


const AllPost = () => {

  const [posts,setPosts] = useState()

useEffect(()=>{
  dbStore.getAllPosts().then((post)=>{
    if (post) setPosts(post.documents)
  })
}
,[])         //will run only on initial render, and won't run after every re render as dependency array is empty

  return posts ? (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post)=>(
          <div key={post.$id}>
            <PostCard  {...post}/>
          </div>
        ))}
      </div>
      </Container>
  ):null
}

export default AllPost