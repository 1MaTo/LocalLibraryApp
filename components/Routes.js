import React from 'react';
import Home from './Home'
import Initialize from './Initialize'
import Login from './Login'
import { NativeRouter, Route, Redirect, BackButton } from "react-router-native";
import { useSelector } from 'react-redux';
import Account from './Account'


export default function Routes() {

    const isLogin = useSelector(state => state.isLogin)

    const PrivateRoute = ({ children, ...rest }) => {
        return (
            <Route
                {...rest}
                render={() =>
                    isLogin ? (
                        children
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                }}
                            />
                        )
                }
            />
        );
    }

    return (
        <NativeRouter>
            <BackButton>
                <Route exact path="/" component={Initialize} />
                <PrivateRoute exact path="/home">
                    <Home />
                </PrivateRoute>
                <PrivateRoute exact path="/account">
                    <Account />
                </PrivateRoute>
                <Route exact path="/login" component={Login} />
            </BackButton>
        </NativeRouter>
    );
}
