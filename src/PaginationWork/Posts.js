import React from 'react'

const Posts = ({ posts, loading }) => {
    if (loading) {
        return (<div className='Loader'><div className="spinner-border">
            <span className="sr-only">Loading...</span>
        </div></div>)
    }
    return (
        <div>
            <h1>POSTS </h1>
            <ul>
                {posts.map(post => (<li style={{ textAlign: 'left' }} key={post.id}>{post.title}</li>))}
            </ul>
        </div>
    )
}

export default Posts
