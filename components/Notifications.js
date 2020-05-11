import React from 'react'
import styled from 'styled-components'
import { Container, Button, Text, List, Left, Right, ListItem, Icon } from 'native-base'
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

    return (
        <Background>
          <List>
            <ListItem>
              <Left>
                <Text>Новая книга добавлена в библиотеку</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem>
             <Left>
                <Text>Удалена книга "Выразительный JavaScript"</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Background>
    )
}