import React from 'react'
import "./post.css"
import { Link } from 'react-router-dom';
import { imagePath } from '../../config';

const Post = ({ post }) => {


  return (
    <div className='post'>
        <Link to={`/post/${post._id}`} >
     
          <img className='postImg'
            src={imagePath+post.photo} alt="not found " />
  
      
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
        </Link>
      <p className="postDesc">
        {post.desc}
      </p>


      <div className="postActions">
        <button className="postActionBtn">
          <i className="fas fa-thumbs-up"></i>
        </button>
        <button className="postActionBtn">
          <i className="fas fa-heart"></i>
        </button>
        <button className="postActionBtn">
          <i className="fas fa-share"></i>
        </button>
      </div>
    </div>

  )
}

export default Post
