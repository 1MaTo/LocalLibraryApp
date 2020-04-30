import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Button, Text, Header, Left, Body, Right, Container, Thumbnail } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import MainFooter from './Footer'
import { Avatar } from 'react-native-material-ui';
import theme from '../theme/theme'
import { AntDesign } from '@expo/vector-icons';
import MainHeader from './Header'
import { useUpdate } from './store/updateStore'


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

export default function Home() {

  const updateUserData = useUpdate('USER')
  const [activeSection, setActiveSection] = useState('books')
  const [sectionContent] = useState({
    book: {
      icon: "book",
      headerIcon: "book",
      text: "Книги"
    }
  })

  useEffect(() => {
    updateUserData()
  }, [])

  return (
    <StyledView>
      <MainHeader iconType="AntDesign" icon="book" headerText="Книги"/>
      <Title>Welcome to home page</Title>
      <MainFooter setActiveSection={setActiveSection}/>
    </StyledView >
  );
}