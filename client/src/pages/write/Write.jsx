import React, { useContext, useEffect, useRef, useState } from 'react'
import "./write.css"
import { Context } from '../../context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';
import { proxy } from '../../config';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../../firebase';

const Write = () => {

  const titleRef = useRef();
  const descRef = useRef();
  const [file, setFile] = useState(null)
  const [publish, setPublish] = useState(false)
  const [fileurl, setFileurl] = useState(null);
  const [fileupload ,setFileupload] = useState(false);



  

  // take current user from context
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    setPublish(true);
    e.preventDefault();

    if (user == null) {
      setPublish(false);
      toast.error("You have not Login so please login then Post")
      return
    }

    const newPost = {
      username: user.username,
      title: titleRef.current.value,
      desc: descRef.current.value
    }

    if(fileurl)
    {
      newPost.photo = fileurl;

    }


    try {
      const res = await axios.post(proxy + "/post", newPost)
      console.log(res.data)
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      toast.error("Try with different title");
    }
    setPublish(false);
  }


  useEffect(() => {
    const checkUser = () => {
      if (user == null) {
        toast.warn("please login then Post");
      }
    }

    const uploadfile = () => {
       setFileupload(true)
      const name = new Date().getTime() + file.name
      console.log(name)
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          toast.error("not able to upload file")
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFileurl(downloadURL);
            console.log(downloadURL);
            setFileupload(false);
          });
        }
      );

    }



    checkUser();
    file && uploadfile(); 
  }, [file])


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
            {
              !file &&<p style={{"color":"green"}}>Select Your image</p>

            }
            
          </label>
          <input
            onChange={e => setFile(e.target.files[0])}
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
        <button className="writeSubmit" type='submit' disabled={fileupload}>Publish</button>
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