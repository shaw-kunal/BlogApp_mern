import React, { useEffect, useState } from 'react'
import "./sidebar.css"
import axios from 'axios';
import { proxy } from '../../config';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(proxy + "/catagroy")
      // console.log(res);
      setCats(res.data);
    }
    getCats();

  }, [])


  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="title">ABOUT ME</span>
        <div className='sidebarImgContainer'>
          <img className='sidebarImg' src="https://images.unsplash.com/photo-1649894223069-78bec9335ada?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z2lybCUyMHdpdGglMjBmbG93ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique voluptas facere magni assumenda. Ipsum esse nobis porro iste atque aperiam?</p>
      </div>
      <div className="sidebarItem">
        <span className="title">CATEGORIES</span>
        <ul className="sidebarList">
          {
            cats.map((cat,i) => (
              <Link to={`/?cat=${cat.name}`} className='link' key={i}>
              <li  className="sidebarListItem">{cat.name}</li>

              </Link>
            ))
          }
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="title">Follow Us</span>
        <div className="sidebarSocial">
          <i className=" sidebarIcon fa-brands fa-twitter"></i>
          <i className=" sidebarIcon fa-brands fa-facebook"></i>
          <i className=" sidebarIcon fa-brands fa-youtube"></i>
          <i className=" sidebarIcon fa-brands fa-instagram-square"></i>

        </div>
      </div>

    </div>
  )
}

export default Sidebar