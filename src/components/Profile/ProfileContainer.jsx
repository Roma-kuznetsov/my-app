import React from 'react';
import { getUserProfile, getStatus, updateStatus, savePhoto,saveProfile } from '../../redux/profile-reducer';
import Profile from './Profile';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile(){
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.autorissedUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProp,prevState,snapshot){
        if(this.props.location !== prevProp.location){
            this.refreshProfile()
        }
    }
//this.props.location !== prevProp.location
    render() {
        return (
            <Profile {...this.props} 
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatus={this.props.updateStatus} 
            isOwner={!this.props.match.params.userId}
            savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    autorissedUserId: state.auth.userId,
})


export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)