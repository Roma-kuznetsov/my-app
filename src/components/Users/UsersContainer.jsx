import React from "react";
import { connect } from "react-redux";
import { acceptFollow, acceptUnfollow, toggleIsFollowing, getUsers, follow, unfollow } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import { getPageSizeSelector, getUsersSelectorHard, totalUsersCountSelector, currentPageSelector, isFachingSelector, followingInProgressSelector } from "../../redux/users-selectors";



class UsersAPIContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        debugger
        return <>
            {this.props.isFaching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    };
}


const mapStateToProps = (state) => {
    return {
        users: getUsersSelectorHard(state),
        pageSize: getPageSizeSelector(state),
        totalUsersCount: totalUsersCountSelector(state),
        currentPage: currentPageSelector(state),
        isFaching: isFachingSelector(state),
        followingInProgress: followingInProgressSelector(state),
    }
}


export default compose(
    connect(mapStateToProps, {
        acceptFollow,
        acceptUnfollow,
        toggleIsFollowing,
        getUsers,
        follow,
        unfollow,
    })
)(UsersAPIContainer);