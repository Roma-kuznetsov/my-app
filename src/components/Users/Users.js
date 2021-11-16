import React from "react";
import s from "./users.module.css";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/def.jpg";


let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }


  return (
    <div className={s.container} >
      <div>
        {pages.map(p => { return <span className={props.currentPage === p && s.selectedPage} onClick={() => { props.onPageChanged(p) }} > {p}</span> })}
      </div>
      {
        props.users.map(u => <div key={u.id}>
          <div className={s.itemUser}>
            <div>
              <div>
                <NavLink to={'/profile/' + u.id}>
                  <img className={s.photouser} src={u.photos.small != null ? u.photos.small : userPhoto} alt="" />
                </NavLink>
              </div>
            </div>
            <div className={s.profileUsers} >
              <div>
                {u.name}
              </div>
              <div>
                {u.status}
              </div>
              <div>
                {u.followed ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                  props.follow(u.id)
                }} >Follow</button>
                  : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                    props.unfollow(u.id)
                  }}>Unfollow</button>}
              </div>
            </div>
          </div>
        </div>)
      }
    </div >
  )
}

export default Users;