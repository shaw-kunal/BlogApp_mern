import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { imagePath, proxy } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./postComment.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';



const PostComment = ({ postId, comment, setComment }) => {
    const { user } = useContext(Context);
    const [commentText, setCommentText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Track emoji picker visibility
    const handleCommentSubmit = async () => {
        const commentRes = {
            postId,
            username: user.username,
            text: commentText,
            profilePic: user.profilePic
        }

        try {
            const res = await axios.post(proxy + "/comment/", commentRes);
            console.log(res.data)
            setComment([...comment, res.data])
            toast.success("commented successfully")
        } catch (error) {
            toast.error("somethinng went wrong")
        }
        setCommentText("");
    };

    const handleClearText = () => {
        setCommentText("");
    };
  


    return (
        <div className="postComment">
            <div className="imgContainer">
                {
                    comment?.profilePic ?
                        <img className="topImg"
                            src={comment.profilePic}
                            alt="" />
                        :
                        <img className="topImg" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt='not found' />
                }
            </div>
            <div className='inputContainer'>
                <input
                    type="text"
                    className="commentInput"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />



                <div className="actionButtons">
                    {commentText.length > 0 && (
                        <> <button className="clearButton" onClick={handleClearText}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                            <button className="sendButton" onClick={handleCommentSubmit}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </button>
                        </>
                    )
                    }
                </div>
            </div>
           


        </div>
    );
};

export default PostComment;
