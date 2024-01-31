import React from 'react'

const Container = ({children}) => {
  return (
    <div className='container mx-auto p-4 min-h-screen flex flex-col'>{children}</div>
  )
}

export default Container