import React, { useEffect } from 'react'
import dbStore from '../../appwrite/config'
import { useForm } from "react-hook-form"
import { Input, RTE,Select,Button} from "../index"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostForm = ({ post }) => {


  const { register, control, getValues, watch, handleSubmit, setValue, formState: { errors } }
  = useForm(
      {
        defaultValues: {
          title: post?.title || "",
          slug: post?.$id || "",
          content: post?.content || "",
          status: post?.status || "active"
        }
      }
    )
    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.userData)

    const submitHandler = async (data)=>{
      console.log("hi");
      if (post){
        const file  = data.image[0] ? await dbStore.uploadFile(data.image[0]):null
        if(file){
          await dbStore.deleteFile(post.featuredImage)
          data.featuredImage = file.$id
          const dbPost = await dbStore.updatePost(post.$id,{...data})
          if (dbPost){
              navigate(`/post/${dbPost.$id}`)
        }
        }
      }else{
        const file = data.image[0] ? await dbStore.uploadFile(data.image[0]):null

        if(file){
          data.featuredImage = file.$id

          const dbPost = await dbStore.createPost({
            ...data,
            userId:userData.$id
          })
          if (dbPost){
            navigate(`/post/${dbPost.$id}`)
          }
        }
      }
    }
    const slugTransform = (value) => {
      if (value && typeof value==="string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\d]/g, '-')
    }

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log(value);

      if (name === "title") {
        setValue("slug", slugTransform(value.title))
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform])

  


  return (
   
    <form onSubmit={handleSubmit(submitHandler)} className='flex justify-between'>

      <div className='w-2/3 space-y-4'>
        <Input
          className="w-11/12"
          label="Title"
          {...register("title", {
            required: "This is required!"
          })}
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

        <Input
          className="w-11/12"
          label="Slug"
          {...register("slug", {
            required: "This is required!"
          })}
          onInput={(e) => (
            setValue("slug", slugTransform(e.target.value))
          )
          }
        />
        {errors.slug && <p className='text-red-500'>{errors.slug.message}</p>}

        <RTE
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")} />

      </div>

      <div className='w-1/3 ml-4'>
        <Input
          type="file"
          label="Upload Image"
          accept=".jpg, .jpeg, .png, .gif"
          {...register("image",{
            required: "Image is required!"
          })}
        />
        {errors.image && <p className='text-red-500'>{errors.image.message}</p>}


        {post &&
          <img
            src={`${dbStore.getFilePreview(post.featuredImage)}`}
            alt={post.title}
            className='mt-2 rounded-md shadow-md'
          />
        }

        <Select
          label="Status: "
          options={["active", "inactive"]}
        className="mb-4 p-4 w-full"
          {...register("status", {
            required: "Status is required!"        //see if error shows up here
          })}
        />

      <Button
      type="submit"
      className = {post ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800":"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800"}
      >
        {post ? "Update":"Submit"}
      </Button>
      </div>

    </form>
  )
}

export default PostForm