import React, { useEffect } from 'react'
import { Container, Button } from '../component'
import dbStore from '../appwrite/config'
import { useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import parse from "html-react-parser"
import { useState } from 'react'

const Post = () => {

  const [post, setPost] = useState()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const { id } = useParams()
  const navigate = useNavigate()


  useEffect(() => {
    if (id) {
      dbStore.getPost(id).then((posts) => {
        // console.log(posts);
        if (posts) setPost(posts)
        else navigate("/")
      })
    } else {
      navigate("/")
    }
  }, [id, navigate])

  const deleteHandler = () => {
    dbStore.deletePost(post.$id).then((deletePostConfirmation) => {
      // console.log(deletePostConfirmation);

      // console.log("post deleted");
      if (deletePostConfirmation) {
        // console.log("post deleted -message2");

        dbStore.deleteFile(post.featuredImage)
        navigate("/")
      }
    })


  }



  return post ? (
    <div className="max-w-2xl mx-auto bg-white p-8 my-4 shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-4 bg-green-300 text-center">{post.title}</h2>


      <div className="mb-4">
        <img src={dbStore.getFilePreview(post.featuredImage)} alt={post.title} className="w-full h-full object-cover rounded-md" />
      </div>


      <p className="text-gray-700 mb-4">{parse(post.content)}</p>

      <div className="flex justify-between items-center">
        <div>
          <Link to={`/edit-post/${post.$id}`}>
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 focus:outline-none">
              Edit
            </Button>
          </Link>
          <Button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none" onClick={deleteHandler}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  ) : null
}

export default Post


