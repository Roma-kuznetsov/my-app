import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
    <div className={s.item}>
      <img alt="11" src='https://sun1-22.userapi.com/s/v1/ig2/7dYFo8IW3Sw8n_Um5CYVvgok8oVtHaR8NobVZybxNyzPOx3VkIRAVllPfZrJ8ELA3jcxzzPlzpmRuASh6fUoztLK.jpg?size=50x0&quality=96&crop=42,0,1037,1037&ava=1' />
      {props.message}
      <div>
        <span>like</span> {props.likesCount}
      </div>
    </div>
  )
}

export default Post;