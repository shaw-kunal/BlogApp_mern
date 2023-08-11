import React, { useContext, useEffect, useState } from 'react'
import "./singlePost.css"
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { imagePath, proxy } from '../../config';
import { Context } from '../../context/Context';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the default styles



const SinglePost = () => {
    const [post, setPost] = useState({})
    const [Deleting, setDeleting] = useState(false);
    const [Updaing, setUpdating] = useState(false)
    const location = useLocation();
    const { user } = useContext(Context)
    const [updateMode, setUpdateMode] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")



    const path = location.pathname.split('/')[2];
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("http://localhost:5000/api/post/" + path);
            setPost(res.data);
            // console.log(res);
            setTitle(res.data.title);
            setDesc(res.data.desc)


        }
        getPost();
    }, [path])


    const handleDelete = async () => {

        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setDeleting(true)
                        try {
                            await axios.delete(proxy + "/post/" + post._id, {
                                data: { username: user.username }
                            })

                            window.location.replace("/")

                        } catch (error) {

                        }
                        finally {
                            setDeleting(false);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        // Do nothing or handle cancellation
                        //   console.log('Deletion canceled');
                    }
                }
            ]
        });
    }



    // handle update
    const handleupdate = async () => {
        setUpdating(true)
        try {
            await axios.put(proxy + "/post/" + post._id,
                { username: user.username, title, desc }
            )

            window.location.reload();

        } catch (error) {

        }
        finally {
            setUpdating(false)
            setUpdateMode(false);
        }
    }



    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                <div className="singlePostImgContainer">
                    {
                        post.photo &&
                        <img className='singlePostImg'
                            src={imagePath + post.photo} alt="not found " />
                    }
                </div>
                {
                    updateMode ?
                        <input
                            type='text'
                            className='singlePostTitleInput '
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                        :
                        <h2 className="singlePostTitle">
                            {post.title}
                            {
                                post.username === user?.username &&
                                <div className="singlePostEdit">
                                    <i className="singlePostIcon edit fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i onClick={handleDelete} className="singlePostIcon delete fa-solid fa-trash"></i>
                                </div>
                            }
                        </h2>
                }

                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Author:<b>
                        <Link to={`/?user=${post.username}`} className='link'>

                            {post.username}
                        </Link>
                    </b></span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? <textarea
                        className='SinglePostDescInput'
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}

                    /> :
                        <p className='SinglePostDesc'>
                            {post.desc}
                        </p>
                }
               
               {
                updateMode &&
                <button className="singlePostButton" onClick={handleupdate}>Update</button>
               }
            </div>
            {
                (Deleting || Updaing) && <div className="overlay">
                    <div className="loading-spinner">
                    </div>
                </div>
            }
        </div>

    )
}

export default SinglePost
