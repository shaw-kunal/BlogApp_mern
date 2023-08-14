import React from 'react'
import "./comment.css"
import { imagePath } from '../../config'
import { formatDistanceToNow } from 'date-fns';


const Comment = ({comment}) => {
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true });

  return (
    <div className='comment'>
        <div className="commentWrapper">
         
        <div className="imgContainer">
            <img src={imagePath +comment.profilePic} alt="" />
        </div>
        <div className="commentSection">
             <div className="heding">
                 <h3>{comment.username}</h3>
                 <span className='time'>{timeAgo}</span>

             </div>      
            <p>{comment.text}</p> 

     
        </div>

        </div>
    
    </div>
  )
}

export default Comment