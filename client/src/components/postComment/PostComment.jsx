import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import { imagePath, proxy } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';
import "./postComment.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import EmojiPicker from 'emoji-picker-react';



const PostComment = ({ postId ,comment,setComment}) => {
    const { user } = useContext(Context);
    const [commentText, setCommentText] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Track emoji picker visibility
    const handleCommentSubmit = async () => {
        const commentRes= {
            postId,
            username: user.username,
            text: commentText,
            profilePic: user.profilePic
        }

        try {
         const res =   await axios.post(proxy + "/comment/", commentRes);
         console.log(res.data)
          setComment([...comment,res.data])
         toast.success("commented successfully")
        } catch (error) {
            toast.error("somethinng went wrong")
        }
        setCommentText("");
    };

    const handleClearText = () => {
        setCommentText("");
    };
    const handleEmojiClick = (event, emojiObject) => {
        // Handle emoji click event
        if (emojiObject && emojiObject.emoji) {
            const emoji = emojiObject.emoji;
            setCommentText(commentText + emoji);
        }
    };


    return (
        <div className="postComment">
            <div className="imgContainer">
                <img src={imagePath + user.profilePic} alt="" />
            </div>
            <div className='inputContainer'>
                <input
                    type="text"
                    className="commentInput"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                /> 
                {/* <button
                    className='emojiButton'
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                > 😀
                </button> */}


                <div className="actionButtons">
                    {commentText.length > 0 && (
                        <>  <button className="clearButton" onClick={handleClearText}>
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
            {showEmojiPicker &&

                <EmojiPicker onEmojiClick={handleEmojiClick}
                    disableAutoFocus={true}
                    pickerStyle={{ width: '300px', height: '300px' }}
                />

            }


        </div>
    );
};

export default PostComment;
