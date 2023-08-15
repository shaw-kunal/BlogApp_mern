import React, { useEffect, useState } from 'react'
import "./sidebar.css"


const Sidebar = () => {
  const [cats, setCats] = useState(["Music", "Nature", "Style", "Tech", "Dance",]);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994_640.jpg",
    "https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_640.jpg",
    "https://cdn.pixabay.com/photo/2014/02/13/07/28/wordpress-265132_640.jpg",
    "https://cdn.pixabay.com/photo/2014/12/28/13/20/wordpress-581849_640.jpg",
    'https://cdn.pixabay.com/photo/2020/03/06/08/00/laptop-4906312_640.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when component unmounts
    };
  }, []);




  return (
    <div className='sidebar'>
      <div className="sidebarItem">
        <span className="title">ABOUT ME</span>
        <div className='sidebarImgContainer'>
          {images.map((img, idx) => (
            <img
              key={idx}
              className={`sidebarImg ${imageIndex === idx ? 'active' : ''}`}
              style={{ opacity: imageIndex === idx ? 1 : 0 }}
              src={img}
              alt=""
            />

          ))}
        </div>
        <p style={{ "fontSize": "18px" }}>Welcome to our blog! We are a team of passionate writers and creators who love sharing our thoughts, experiences, and knowledge with the world.</p>
      </div>
      <div className="sidebarItem">
        <span className="title">CATEGORIES</span>
        <ul className="sidebarList">
          {
            cats.map((cat, i) => (

              <li key={i} className="sidebarListItem">{cat}</li>

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