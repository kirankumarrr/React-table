import React, { useEffect, useState } from 'react'
import axios from "axios"
import Pagination from "./Pagination"
import Posts from "./Posts"
const IndexPage = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
            console.log(res)
            setPosts(res.data);
            setLoading(false)
        }
        fetchPosts()
    }, [])
    console.log(posts)

    //Pagination Code 

    //Get current Post
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPage, indexOfLastPage)

    //get paginateCurrentData 
    const paginateCurrentData = (number) => { setCurrentPage(number) }

    const paginatePerData = (pgnum) => { setPostsPerPage(pgnum); setCurrentPage(1) }

    //arrow next page
    const nextPage = (currentPage) => { setCurrentPage(currentPage + 1) }
    //arrow prev page 
    const prePage = () => { setCurrentPage(currentPage - 1) }
    return (
        <div>
            IndexPage
            <Posts posts={currentPosts} loading={loading} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPost={posts.length}
                paginateCurrentData={paginateCurrentData}
                paginatePerData={paginatePerData}
                currentPage={currentPage}
                nextPage={nextPage}
                prePage={prePage} />
        </div>
    )
}

export default IndexPage
