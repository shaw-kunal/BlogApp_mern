import React from 'react'
import "./header.css"
import imageHeader from './../../images/nature-3267579_640.jpg'
const Header = () => {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className='headerTitleSm'>The Earth & Nature ...</span>
            <span className='headerTitleLg'>Blog</span>
        </div>
        <img className='headerImg' 
       src={imageHeader}
        alt="" />
    </div>


    )
}

export default Header