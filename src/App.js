import React, { Component,Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/Login';
import { connect ,Provider} from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from "./redux/redux-store";
import { BrowserRouter,Route} from "react-router-dom";
//Ленивая загрузка
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));


class App extends Component {
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialazed) {
            return <Preloader />
        }
        return (
            <div className='app-wrapper' >
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Route path="/dialogs" 
                            render={()=><DialogsContainer />}/>
                    </Suspense>
                    <Route path='/profile/:userId?'
                        render={() => <ProfileContainer />} />
                    <Route path='/users'
                        render={() => <UsersContainer />} />
                    <Route path='/login'
                        render={() => <Login />} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    initialazed: state.app.initialazed
})

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp = (props) =>{
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>

}

export default SamuraiJSApp;