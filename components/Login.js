import React, { useState } from 'react'
import styled from 'styled-components'
import { Container, Form, Item, Input, Label, Button, Text, Icon } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import md5 from 'md5';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-native';
import { Spinner } from 'native-base'
import theme from '../theme/theme'

const InputForm = styled(Item)`
    width: 280px;
    border-color: ${props => props.theme.primary.main};
    border-radius: 10px;
    margin-top: 25px;
    padding: 5px;
`

const DataForm = styled(Form)`
    flex: 2;
    justify-content: center;
    align-items: center;
`

const LoginForm = styled(Container)`
    background: ${props => props.theme.background.main};
    flex: 1;
    justify-content: center;
    align-items: center;
`

const LabelBox = styled(Container)`
    flex-direction: column;
    justify-content: flex-end;
    background: ${props => props.theme.background.main};
    flex: 1;
`

const LabelIcon = styled(AntDesign)`
    margin: 0px auto 0px auto;
    color: ${props => props.theme.primary.main};
`

const LoginLabel = styled.Text`
    font-size: 24px;
    color: ${props => props.theme.primary.main};
`

const Submit = styled(Button)`
    ${props => !props.disabled ?
        `background-color: ${props.theme.primary.main}` : null};
    justify-content: center;
    width: 200px;
    margin: 60px auto auto auto;
    border-radius: 5px;
`

const ErrorText = styled(Text)`
    text-align: center;
    width: 300px;
    font-size: 14px;
    color: ${props => props.theme.error.main};
    top: 180px;
    ${props => !props.error ? `display: none;` : null}
    ${props => props.error ? `position: absolute;` : null}
`

export default function Login() {

    const [passVisivle, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(false)

    const dispatch = useDispatch()

    const isLogin = useSelector(state => state.isLogin)
    const handleChangePassVisible = () => {
        setVisible(!passVisivle)
    }

    const handleEmailChange = (text) => {
        setEmail(text)
    }

    const handlePassChange = (text) => {
        setPassword(md5(text))
        console.log(password)
    }

    const handleLogIn = () => {
        setLoading(true)
        axios
            .post('/api/login', { email: email, password: password })
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_LOGIN", isLogin: true })
                }
            })
            .catch(error => {
                setLoading(false)
                setError(true)
                setPassword('')
            })
    }

    return (
        <LoginForm>
            <LabelBox>
                <LabelIcon name="book" size={64} />
                <LoginLabel>
                    Войдите в систему
                </LoginLabel>
            </LabelBox>
            <DataForm>
                <InputForm rounded>
                    <Label>Email</Label>
                    <Input disabled={isLoading} onChangeText={text => handleEmailChange(text)} />
                </InputForm>
                <InputForm rounded>
                    <Label>Пароль</Label>
                    <Input disabled={isLoading} secureTextEntry={!passVisivle} onChangeText={text => handlePassChange(text)} />
                    <Icon name={passVisivle ? 'md-eye' : 'md-eye-off'} onPress={handleChangePassVisible} />
                </InputForm>
                <ErrorText error={isError}>Пользователь с таким email и паролем не найден</ErrorText>
                <Submit disabled={isLoading} onPress={handleLogIn}>
                    {
                        isLoading ? <Spinner color={theme.first.primary.main} /> :
                            <Text>Войти</Text>
                    }
                </Submit>
            </DataForm>
            {isLogin ? <Redirect to={{ pathname: "Home" }} /> : null}
        </LoginForm>
    )
}