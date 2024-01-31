import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../component'
// import { useNavigate } from 'react-router-dom'
import dbStore from '../appwrite/config'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = () => {

  const [posts, setPosts] = useState([])
  const authStatus = useSelector((state) => state.auth.status)
  // const navigate = useNavigate()
  useEffect(() => {
    dbStore.getAllPosts().then((post) => {
      if (post) {
        console.log(post);

        setPosts(post.documents)
      }
    })
  }, [])  //see if it only runs after initial render???????????//


  return authStatus ? (
    <Container>

      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {posts.map((post) => (
          <PostCard {...post} />
        ))}
      </div> */}
    <div className="relative bg-gradient-to-r from-purple-800 to-indigo-600 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-gradient-to-r from-purple-800 to-indigo-600 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Welcome to Your Blog</span>{' '}
                <span className="block text-indigo-300 xl:inline">Journey</span>
              </h1>
              <p className="mt-3 text-base text-indigo-200 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Explore the latest insights and stories crafted just for you. Start your journey into the world of knowledge.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/add-post"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Post your First Blog
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3 p-3 z-10">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="./online-learning-concept.png"
          alt="Placeholder Image"
        />
      </div>
    </div>

    </Container>
  ) :
    <Container>
      <div className='flex justify-between items-center w-2/3 m-auto'>
        <div>
          <img src="./authentication.png" alt="" />
        </div>
        <div className='text-center mt-8 text-gray-600 font-extrabold text-3xl'>
          Login to read your posts
        </div>
      </div>
    </Container>
}

export default Home