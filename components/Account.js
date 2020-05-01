import React from 'react'
import styled from 'styled-components'
import { Container, Button, Text } from 'native-base'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

const Background = styled(Container)`
    background: ${props => props.theme.background.main};
`

export default function Account() {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogOut = () => {
        axios
            .post('api/logout')
            .then(response => {
                dispatch({ type: "SET_LOGIN", isLogin: false })
                dispatch({ type: "SET_USER", user: null })
                console.log('logOut')
            })
    }

    return (
        <Background>
            <Header replace={true} iconType="MaterialCommunityIcons" icon="account-circle" headerText={user.firstName + ' ' + user.secondName} />
            <Button full onPress={handleLogOut}>
                <Text>
                    Выйти
                </Text>
            </Button>
        </Background>
    )
}