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
import BookPage from './BookPage'
import UserBookList from './UserBookList'


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

const PageBackground = styled.View`
  flex: 1;
`

export default function Home() {

  const updateUserData = useUpdate('USER')
  const [activeSection, setActiveSection] = useState({
    name: "books",
    headerIcon: "book",
    headerIconType: "AntDesign",
    headerText: "Книги"
  })

  useEffect(() => {
    updateUserData()
  }, [])

  const GetActivePage = () => {
    switch (activeSection.name) {
      case "books":
        return <BookPage />;
      case "library":
        return <UserBookList />;
      default:
        return <Title>Not complete yet</Title>;
    }
  }

  return (
    <StyledView>
      <MainHeader
        iconType={activeSection.headerIconType}
        icon={activeSection.headerIcon}
        headerText={activeSection.headerText} />
      <PageBackground>
        <GetActivePage />
      </PageBackground>
      <MainFooter setActiveSection={setActiveSection} />
    </StyledView >
  );
}