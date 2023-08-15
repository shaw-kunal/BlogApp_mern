import React, { useContext, useEffect, useState } from 'react'
import "./singlePost.css"
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { proxy } from '../../config';
import { Context } from '../../context/Context';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import Comment from '../comment/Comment';
import PostComment from '../postComment/PostComment';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';



const SinglePost = () => {
    const [post, setPost] = useState({})
    const [Deleting, setDeleting] = useState(false);
    const [Updaing, setUpdating] = useState(false)
    const location = useLocation();
    const { user } = useContext(Context)
    const [updateMode, setUpdateMode] = useState(false)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [liked, setLiked] = useState(); // State to track like button color
    const [hearted, setHearted] = useState(); // State to track heart button color
    const [likeCount, setLikeCount] = useState()
    const [heartCount, setHeartCount] = useState()
    const [comment, setComment] = useState([])

    const path = location.pathname.split('/')[2];

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("http://localhost:5000/api/post/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc)
            setLikeCount(res.data.like.length);
            setHeartCount(res.data.heart.length)
        }

        const getComment = async () => {
            try {
                const res = await axios.get(proxy + `/comment/${post._id}`);
                setComment(res.data);
            } catch (error) {


            }
        }
        getPost();
        getComment();


    }, [path, post._id])
    useEffect(() => {
        const getPostAndComment = async () => {
            try {
                const postResponse = await axios.get("http://localhost:5000/api/post/" + path);
                setPost(postResponse.data);
                setTitle(postResponse.data.title);
                setDesc(postResponse.data.desc);
                setLiked(postResponse.data.like?.includes(user?.username) ? true : false);
                setHearted(postResponse.data.heart?.includes(user?.username) ? true : false);
                setLikeCount(postResponse.data.like.length);
                setHeartCount(postResponse.data.heart.length);

                const commentResponse = await axios.get(proxy + `/comment/${postResponse.data._id}`);
                setComment(commentResponse.data);
            } catch (error) {
                // Handle error here
            }
        };

        getPostAndComment();
    }, [path, user]);

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



    const handleLikeClick = async () => {
        try {
            if (liked) {

                setLikeCount(likeCount - 1);
                setLiked(false);
                const res = await axios.post(proxy + `/post/${post._id}/unlike`, { username: user.username })
                // console.log(res);

            }
            else {
                setLikeCount(likeCount + 1);
                setLiked(true);
                const res = await axios.post(proxy + `/post/${post._id}/like`, { username: user.username })
                // console.log(res);
            }
        } catch (error) {
        }
    };

    const handleHeartClick = async () => {
        try {
            if (hearted) {
                setHeartCount(heartCount - 1);
                setHearted(false);
                const res = await axios.post(proxy + `/post/${post._id}/removeheart`, { username: user.username })


            }
            else {
                setHeartCount(heartCount + 1);
                setHearted(true);
                const res = await axios.post(proxy + `/post/${post._id}/heart`, { username: user.username })
            }

        } catch (error) {
            toast.error("There is something wrong ")
        }
    };


    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                <div className="singlePostImgContainer">
                    {
                        post.photo &&
                        <img className='singlePostImg'
                            src={post.photo} alt="not found " />
                    }
                </div>

                <div className='titleContainer'>
                    {post && user && (
                        <div className='singlePostAction'>
                            <div className="singlePostActions">
                                <div className="singlePostAction">
                                    <i onClick={handleHeartClick} className={`fa-solid fa-heart singleAction ${hearted ? 'heart' : ''}`}></i>
                                    <span>{heartCount !== 0 && heartCount}</span>
                                </div>
                                <div className="postAction">
                                    <i onClick={handleLikeClick} className={`fa-solid fa-thumbs-up singleAction ${liked ? 'like' : ''}`}></i>
                                    <span>{likeCount !== 0 && likeCount}</span>
                                </div>
                                <div className="postAction">
                                    <i className="fa-solid fa-share-from-square singleAction"></i>
                                    <FacebookShareButton url={window.location.href} quote={"share this Blog with Your Friend"}
                                        hashtag="#share"
                                    >
                                        <FacebookIcon logoFillColor="white" size={40} round={true}></FacebookIcon>
                                    </FacebookShareButton>

                                    <TwitterShareButton url={window.location.href} quote={"share this Blog with Your Friend"}
                                        hashtag="#share"
                                    >
                                        <TwitterIcon logoFillColor="white" size={40} round={true}></TwitterIcon>
                                    </TwitterShareButton>
                                    <WhatsappShareButton url={window.location.href} quote={"share this Blog with Your Friend"}
                                        hashtag="#share"
                                    >
                                        <WhatsappIcon logoFillColor="white" size={40} round={true}></WhatsappIcon>
                                    </WhatsappShareButton>

                                </div>
                            </div>
                        </div>
                    )}
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
                </div>


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
                            {desc.split('\n').map((line, index) => (
                                <React.Fragment key={index}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </p>
                }

                {
                    updateMode &&
                    <button className="singlePostButton" onClick={handleupdate}>Update</button>
                }
            </div>

            {/* here comment section*/}

            {
                user &&
                <PostComment postId={post._id} comment={comment} setComment={setComment} />
            }

            {
                comment.map((comment) => (

                    <Comment key={comment._id} comment={comment} />

                ))
            }






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
