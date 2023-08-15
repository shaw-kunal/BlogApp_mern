import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import  {proxy} from "./../../config.js"
import "./home.css"
import axios from "axios"
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'



const Home = () => {
    const [posts, setPosts] = useState([])
    const {search} = useLocation();
    // console.log(search)

    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const res = await axios.get( proxy + "/post/"+search);
            setPosts(res.data);
            //  console.log(res);
          } catch (error) {
            // console.log("find error in axios")
            toast.error("something Wrong Try Again Later")
          }
        }

        fetchPosts();
    },[search])

    return (
        <>
            <Header />
            <div className='home'>
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </>
    )
}

export default Home