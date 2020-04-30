import React from 'react'
import styled from 'styled-components'
import { Container, Button, Text } from 'native-base'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'

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
                dispatch({ type: "SET_USER", user: null })
                dispatch({ type: "SET_LOGIN", isLogin: false })
                console.log('logOut')
            })
    }

    return (
        <Background>
            <Header iconType="MaterialCommunityIcons" icon="account-circle" headerText={user.firstName + ' ' + user.secondName} />
            <Button onPress={handleLogOut}>
                <Text>
                    Выйти
                </Text>
            </Button>
        </Background>
    )
}