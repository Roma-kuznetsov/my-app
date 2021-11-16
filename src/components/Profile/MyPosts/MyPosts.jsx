import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import PostReduxForm from './Post/PostFormRedux';
const MyPosts = React.memo(props => {
    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />);

    //let newPostElement = React.createRef();

    let AddPost = (value) => {
        debugger
        props.addPost(value.NewPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={AddPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
})

export default MyPosts;