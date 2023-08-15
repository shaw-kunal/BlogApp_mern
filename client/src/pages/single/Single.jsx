import React from 'react'
import "./single.css"
import Sidebar from '../../components/sidebar/Sidebar'
import SinglePost from '../../components/singlePost/SinglePost'

const Single = () => {
  return (
    <div className='single'>
      <SinglePost />
      <div className='sideBarSetting'>
        <Sidebar />
      </div>
    </div>
  )
}

export default Single