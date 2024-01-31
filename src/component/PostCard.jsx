import React from 'react';
import dbStore from '../appwrite/config';
import { Link } from 'react-router-dom';
import parse from "html-react-parser"

const Postcard = ({$id,title,featuredImage, content="" }) => {
  return (
    <Link to={`/post/${$id}`} className="hover:underline">
    <div className="bg-gradient-to-br from-blue-600 to-red-500 p-6 rounded-lg shadow-md transition transform hover:scale-105">
      {/* Image Section */}
      <div className="mb-4">
        <img
          src={dbStore.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-36 object-cover rounded-md"
        />
        <h2 className="text-white text-2xl font-bold mt-4 text-center">{title}</h2>
      </div>
    </div>
    </Link>
  )
}

export default Postcard