import React from 'react'

const Posts = ({ posts }) => {
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
