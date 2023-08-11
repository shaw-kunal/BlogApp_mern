import React, { useContext, useEffect, useRef, useState } from 'react'
import "./setting.css"
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from "./../../context/Context"
import defaultImg from "../../images/default.png"
import axios from 'axios'
import { toast } from 'react-toastify'
import { proxy } from '../../config'
import { updateFailure, updateStart, updateSuccess } from '../../context/Action'

const Setting = () => {
    const { user,dispatch } = useContext(Context);
    const [file, setFile] = useState(null)
    const [updateMode, setUpdateMode] = useState(false);
    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState(null)

    const checkPassword = () => {
        if (!password) {
            toast.error("Password cannot be empty");
            return false;
        }

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[@#$%^&+=]).{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error("Password must be at least 8 characters long and include a mix of  lowercase, digits, and special characters.");
            return false;
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateMode(true)
        if (!checkPassword()) {
            setUpdateMode(false);
            return;
        }
      dispatch(updateStart());
        if (user) {
            const updatedUser = {
                userId: user._id,
                username: user.username,
                email,
                password
            }

            if (file) {
                const data = new FormData();
                const filename = Date.now() + file.name;
                data.append("name", filename);
                data.append("file", file)
                // console.log(data);
                updatedUser.profilePic = filename;
                
                try {
                    await axios.post(proxy + "/upload", data);
                } catch (error) {
                    toast.error("somthing went wrong");
                }




            }

            try {
                const res = await axios.put(proxy + "/user/" + user._id, updatedUser)
                dispatch(updateSuccess(res.data));
                toast.success("Profile Updated Successfully");
            } catch (error) {
                dispatch(updateFailure());
                toast.error("somthing went wrong");
            }
            finally {
                setUpdateMode(false);
            }

        }
    }

    
    
    
    useEffect(() => {
        setUsername(user.username);
        setEmail(user.email);
    }, [])
    return (
        <div className='setting'>
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdate">Update Your Account</span>
                    {/* <span className="settingDelete">Delete Account</span> */}
                </div>

                <form className='formGroup'>
                    <p>Profile Picture</p>

                    <div className="formProfile">
                        <div className="profileContainer">

                            <img className='profilePicture'
                                src={file ? URL.createObjectURL(file) : defaultImg}
                                alt="not found" />
                        </div>

                        <label htmlFor="settingPP">
                            <i className="settingPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input
                            onChange={e => setFile(e.target.files[0])}
                            type="file" id='settingPP' style={{ display: 'none' }} />
                    </div>

                    <div className="formGroupItem">
                        <label htmlFor="">Username</label>
                        <input style={{ "fontFamily": "lora", "fontWeight": 600 }} type="text" defaultValue={username}
                            disabled />
                    </div>


                    <div className="formGroupItem">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className="formGroupItem">
                        <label htmlFor="">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" />
                    </div>


                    <button className='settingButton' onClick={handleSubmit}>Update</button>
                </form>
                {
                    updateMode && <div className="overlay">
                        <div className="loading-spinner">
                        </div>
                    </div>
                }
            </div>
            <Sidebar />
        </div>

    )
}

export default Setting