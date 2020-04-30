import React, { useEffect } from 'react';
import styled from 'styled-components'
import { Button, Text, Header, Left, Body, Right } from 'native-base'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import MainFooter from './Footer'
import { Avatar } from 'react-native-material-ui';
import { StatusBar } from 'react-native'
import theme from '../theme/theme'

const StyledView = styled.View`
    background-color: ${props => props.theme.background.main}; 
    width: 100%;
    height: 100%;
    padding-top: -16px;
`
const Title = styled.Text`
    margin: auto;
    font-size: 24px;
    color: ${props => props.theme.primary.main};
`

const UserAvatar = styled(Avatar)`
  margin-right: auto;
`

const ToolBar = styled(Header)`
  width: 100%;
  background: ${props => props.theme.primary.main};
`

const ToolbarBody = styled(Text)`
`

export default function Home() {

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
    <StyledView>
      <ToolBar primary>
        <Left>
          <Text>Книги</Text>
        </Left>
      </ToolBar>
      <Title>Welcome to home page</Title>
      <Button onPress={handleLogOut}>
        <Text>
          Выйти
        </Text>
      </Button>
      <MainFooter />
    </StyledView>
  );
}