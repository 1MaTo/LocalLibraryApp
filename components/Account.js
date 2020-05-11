import React from 'react'
import styled from 'styled-components'
import { Container, Button, Text } from 'native-base'
import Header from './Header'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Divider } from 'react-native-material-ui' 

const Background = styled(Container)`
    background: ${props => props.theme.background.main};
`

const InfoText = styled.Text`
    padding: 20px;
    font-size: 16px;
`

const ExitButton = styled(Button)`
    position: absolute;
    bottom: 0px;
    width: 100%;
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
            <InfoText>{`Имя: ${user.firstName}`}</InfoText>
            <Divider />
            <InfoText>{`Фамилия: ${user.secondName}`}</InfoText>
            <Divider />
            <InfoText>{`Email: ${user.email}`}</InfoText>
            <Divider />
            <InfoText>{`Пол: мужской`}</InfoText>
            <Divider />
            <InfoText>{`Книг в использовании: 2`}</InfoText>
            <Divider />
            <InfoText>{`Книг прочитано: 1`}</InfoText>
            <Divider />
            <InfoText>{`Роль: администратор`}</InfoText>
            <Divider />
            <ExitButton full onPress={handleLogOut}>
                <Text>
                    Выйти
                </Text>
            </ExitButton>
        </Background>
    )
}