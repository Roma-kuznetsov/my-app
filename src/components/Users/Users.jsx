import React from "react";
import s from "./users.module.css";
import { NavLink } from "react-router-dom";
import userPhoto from "../../assets/images/def.jpg";
import Paginator from "../common/Paginator/Paginator";


let Users = ({currentPage,onPageChanged,totalUsersCount,pageSize,  ...props}) => {

  return (
    <div className={s.container} >
      <div className={s.pagerContainer}>
        <div className={s.pager}>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} pageSize={pageSize}  />
        </div>
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