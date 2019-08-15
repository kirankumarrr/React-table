import React from 'react'

const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h1>loading</h1>
    }
    return (
        <div>
            <h1>POSTS </h1>
            <ul>
                {

                    posts.map(post =>
                        (
                            <li key={post.id}>{post.title}</li>
                        )
                    )
                }
            </ul>
        </div>
    )
}

export default Posts
