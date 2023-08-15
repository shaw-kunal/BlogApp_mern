import React, { useContext, useEffect, useState } from 'react'
import "./post.css"
import { Link } from 'react-router-dom';
import { imagePath, proxy } from '../../config';
import { Context } from "../../context/Context"
import axios from 'axios';
import { toast } from 'react-toastify';
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';


const Post = ({ post }) => {
  // find the user using context api
  const { user } = useContext(Context);
  const [liked, setLiked] = useState(post.like.includes(user?.username) ? true : false); // State to track like button color
  const [hearted, setHearted] = useState(post.heart.includes(user?.username) ? true : false); // State to track heart button color
  const [likeCount, setLikeCount] = useState(post.like.length)
  const [heartCount, setHeartCount] = useState(post.heart.length)
  const [share, setShare] = useState(false)



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
      toast.error("there is something wrong here")
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
    <div className='post'>
      {
        post.photo &&
        <img className='postImg'
          src={post.photo} alt="not found " />
      }

      {
        user && <div className="postActions">
          <div className="postAction">
            <i onClick={handleHeartClick} className={`fa-regular fa-heart action ${hearted ? 'heart' : ''}`}></i>
            <span>{heartCount !== 0 && heartCount}</span>
          </div>
          <div className="postAction">
            <i onClick={handleLikeClick} className={`fa-regular fa-thumbs-up action ${liked ? 'like' : ''}`}></i>
            <span>{likeCount !== 0 && likeCount}</span>
          </div>
          <div className="postAction">
            <i className="fa-regular fa-share-from-square action"
              onClick={() => setShare(!share)}
            ></i>

            {
              share && <div>
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
            }
          </div>
        </div>
      }

      <Link to={`/post/${post._id}`} className='link'>

        <div className="postInfo">
          <div className="postCats">
            {
              post.categories.map((c) => (
                <span className="postCat">{c.name}</span>
              ))
            }
          </div>


          <span className="postTitle">{post.title}</span>
          <hr />
          <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <blockquote className="postDesc">
          {post.desc.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </blockquote>
      </Link>


    </div>

  )
}

export default Post
