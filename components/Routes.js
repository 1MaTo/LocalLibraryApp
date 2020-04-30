import React from 'react';
import Home from './Home'
import Initialize from './Initialize'
import Login from './Login'
import { NativeRouter, Route, Redirect } from "react-router-native";
import { useSelector } from 'react-redux';


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
            <Route exact path="/" component={Initialize} />
            <PrivateRoute exact path="/home">
                <Home />
            </PrivateRoute>
            <Route exact path="/login" component={Login} />
        </NativeRouter>
    );
}
