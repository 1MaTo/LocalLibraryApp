import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Spinner } from 'native-base'
import theme from '../theme/theme'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-native";
import axios from 'axios'

const StyledView = styled.View`
    background-color: ${props => props.theme.background.main}; 
    width: 100%;
    height: 100%;
`
const Title = styled.Text`
    margin: 80% auto 0px auto;
    font-size: 36px;
    color: ${props => props.theme.primary.main};
`

const Loading = styled(Spinner)`
    margin: auto;
    margin-top: 0px;
    padding: 0px;
`



export default function Initialize() {

    const dispatch = useDispatch()
    const isLogin = useSelector(state => state.isLogin)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get('/api/user/info')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_USER", user: response.data })
                    dispatch({ type: "SET_LOGIN", isLogin: true })
                    setLoading(false)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log('not logged')
            })
    }, [])

    return (
        <StyledView>
            <Title>LocalLibrary</Title>
            <Loading color={theme.first.primary.main} />
            {isLoading ? null : isLogin ?
                <Redirect to={{ pathname: "Home", }} /> :
                <Redirect to={{ pathname: "Login", }} />}
        </StyledView>
    );
}