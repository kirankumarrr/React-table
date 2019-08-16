import React, { useEffect, useState } from 'react'
import Pagination from "./Pagination"
import Posts from "./Posts"
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from "../actions/postActions"


const IndexPage = () => {
    const dispatch = useDispatch()

    const { posts } = useSelector(state => state.postReducer)
    //Reducer 

    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(10)

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

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
                prePage={prePage}
                indexOfLastPage={indexOfLastPage}
                indexOfFirstPage={indexOfFirstPage} />
        </div>
    )
}

export default IndexPage
