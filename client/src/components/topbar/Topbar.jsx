import React, { useContext, useState } from 'react'
import "./topbar.css"
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { Logout } from '../../context/Action';
import { imagePath } from '../../config';


const Topbar = () => {
  const [navbar, setNavbar] = useState(false);
  const { user, dispatch } = useContext(Context)



  const handlogout = () => {
    dispatch(Logout())
    window.location.replace("/login");


  }




  const changeBackground = () => {
    // console.log(window.scrollY);
    if (window.scrollY >= 10) {
      setNavbar(true)
    }
    else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', changeBackground);


  return (
    <div className={navbar ? 'top active' : 'top'}>
      <div className="topLeft">
        <i className=" topIcon fa-brands fa-facebook"></i>
        <i className=" topIcon fa-brands fa-twitter"></i>
        <i className=" topIcon fa-brands fa-youtube"></i>
        <i className=" topIcon fa-brands fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link className="topListItem" to={"/"}>Home</Link>
          <Link className="topListItem" >About</Link>
          <Link className="topListItem">Contact</Link>
          <Link className="topListItem" to={"/write"}>Write</Link>


        </ul>
      </div>
      <div className="topRight">
        {
          !user ?
            <>  <Link className="topListItem" to={"/login"}>login</Link>
              <Link className="topListItem" to={"/register"}>Register</Link>
            </>
            : <span className="topListItem"  onClick={handlogout}>logout</span>
        }

{
  user &&
   <Link to={"/setting"}>
    
        <img className="topImg"
        src={ user.profilePic ? imagePath+user.profilePic:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" } 
        alt="" />
   </Link>
}
       
        <i className="topSearchIcon  fa-solid fa-magnifying-glass"></i>

      </div>
    </div>
  )
}

export default Topbar