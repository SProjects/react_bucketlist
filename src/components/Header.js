import React from 'react';
import { Link } from 'react-router-dom'
import EditUser from './users/EditUser';
import Toaster from './Toaster';

const Header = (props) => (
    <div>
        <div className="ui fixed inverted menu">
            <div className="ui container">
                <Link to="/" className="header item">
                    <img src={process.env.PUBLIC_URL + "/images/logo.png"} alt="Bucketlist" className="logo"/>
                    Bucketlist
                </Link>

                <div className="right menu">
                    <div className="ui simple dropdown item">
                        {props.firstName}
                        <i className="dropdown icon"/>
                        <div className="menu">
                            <a className="item" onClick={props.onUserEdit}>
                                Account settings
                            </a>
                            <a className="item" onClick={props.onLogout}>
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <EditUser/>
        <Toaster/>
    </div>
);

export default Header
