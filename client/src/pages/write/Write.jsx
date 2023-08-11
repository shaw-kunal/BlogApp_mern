import React, { useContext, useEffect, useRef, useState } from 'react'
import "./write.css"
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import { proxy } from '../../config';

const Write = () => {

  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null)
  const [publish, setPublish] = useState(false)

  // take current user from context
  const { user } = useContext(Context);

  const handleSubmit = async(e) => {
    setPublish(true);
    e.preventDefault();

    if(user == null)
    {
      setPublish(false);
      toast.error("You have not Login so please login then Post")
      return
    }

    const newPost = {
      username: user.username,
      title: titleRef.current.value,
      desc: descRef.current.value
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file)
      console.log(data);
      newPost.photo = filename;

      try {
         await axios.post(proxy+"/upload" , data);
      } catch (error) {
         toast.error("somthing went wrong");
      }

      try {
        const res = await  axios.post(proxy+"/post", newPost)
        window.location.replace("/post/"+ res.data._id);
      } catch (error) {
      toast.error("somthing went wrong");
      }
    }
    setPublish(false);


  }


  useEffect(() => {
    const checkUser = () => {
      if (user == null) {
        toast.error("please login then Post");
      }
    }
      checkUser();
  
  }, [])


  return (
    <div className='write'>
     {
      file && 
      <img
        className='writeImg'
        src={URL.createObjectURL(file)}
         alt="" />

     }
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">

          <label htmlFor='fileInput'>
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            onChange={e=>setFile(e.target.files[0])}
            type="file" id="fileInput" style={{ display: "none" }} />
          <input
            className='writeInput'
            type="text"
            placeholder='Title'
            autoFocus={true}
            ref={titleRef}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            className='writeInput writeText'
            name="" id=""
            placeholder='Tell Your Story...'
            ref={descRef}
          ></textarea>
        </div>
        <button className="writeSubmit" type='submit'>Publish</button>
        {
                        publish && <div className="overlay">
                            <div className="loading-spinner">
                            </div>
                        </div>
                    }
      </form>
    </div>
  )
}

export default Write