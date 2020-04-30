import React, { useState } from 'react';
import styled from 'styled-components'
import { Text, Header, Left, Button, Body, Right, Container, Thumbnail, Icon } from 'native-base'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-native';

const ToolBar = styled(Header)`
  width: 100%;
  background: ${props => props.theme.primary.main};
`
const HeaderIcon = styled(Icon)`
  font-size: 32px;
  color: ${props => props.theme.primary.light};
`

const HeaderText = styled(Text)`
  color: ${props => props.theme.primary.light};
`

const UserInitials = styled(Container)`
  flex: 0.32;
  background: ${props => props.theme.primary.light};
  height: 45px;
  justify-content: center;
  border-radius: 50px;
  `

const UserInitialText = styled(Text)`
  margin: auto;
`

const AvatarButton = styled(Button)`
  width: 45px;
  height: 45px;
  justify-content: center;
`

const UserAvatar = styled(Thumbnail)`
  width: 45px;
  height: 45px;
`

export default function MainHeader({ path = "home", iconType, icon, headerText }) {

  const userImage = useSelector(state => state.user ? state.user.avatar : null)
  const userInitialAvatar = useSelector(state => state.user !== null ? state.user.firstName[0] + state.user.secondName[0] : 'kek')

  const handlePress = () => {

  }

  return (
    <ToolBar primary>
      <Left>
        <HeaderIcon type={iconType} name={icon} />
      </Left>
      <Body>
        <HeaderText>{headerText}</HeaderText>
      </Body>
      <Right>
        <AvatarButton rounded onPress={handlePress}>
          <Link to="account">
            {userImage ?
              <UserAvatar small source={{ uri: userImage }} /> :
              <UserInitials>
                <UserInitialText>
                  {userInitialAvatar}
                </UserInitialText>
              </UserInitials>}
          </Link>
        </AvatarButton>
      </Right>
    </ToolBar>
  )
}