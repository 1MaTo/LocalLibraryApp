import React, { useState } from 'react'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import styled from 'styled-components'

const FootTab = styled(FooterTab)`
    border: 0px;
    background: ${props => props.theme.secondary.main};
`

const FooterIcon = styled(Icon)`
    ${props => props.title === props.active && `
        color: ${props.theme.primary.main}
        transform: scale(1.2);
    `}
`
const FooterText = styled(Text)`
    font-size: 9px;
    ${props => props.name === props.active && `
    color: ${props.theme.primary.main}
    transform: scale(1.2);
    `}
`

const FooterButton = styled(Button)`
    height: 100%;
    border-radius: 0px;
`

export default function MainFooter({ setActiveSection }) {

    const [active, setActive] = useState('books')

    const [pagesSettings] = useState({
        books: {
            name: "books",
            headerIcon: "book",
            headerIconType: "AntDesign",
            headerText: "Книги"
        },
        library: {
            name: "library",
            headerIcon: "library-shelves",
            headerIconType: "MaterialCommunityIcons",
            headerText: "Библиотека"
        },
        notifications: {
            name: "notifications",
            headerIcon: "notifications",
            headerIconType: "Ionicons",
            headerText: "Уведомления"
        },
        options: {
            name: "options",
            headerIcon: "gear",
            headerIconType: "FontAwesome",
            headerText: "Настройки"
        }
    })

    const handlePress = (name) => {
        setActive(name)
        setActiveSection(pagesSettings[name])
    }

    return (
        <Footer>
            <FootTab>
                <FooterButton onPress={() => handlePress('books')} vertical>
                    <FooterIcon title="books" active={active} type="FontAwesome" name="book" />
                    <FooterText active={active} name="books">Книги</FooterText>
                </FooterButton>
                <FooterButton onPress={() => handlePress('library')} vertical>
                    <FooterIcon title="library" active={active} type="MaterialCommunityIcons" name="library-shelves" />
                    <FooterText active={active} name="library">Список книг</FooterText>
                </FooterButton>
                <FooterButton onPress={() => handlePress('notifications')} vertical>
                    <FooterIcon title="notifications" active={active} name="notifications" />
                    <FooterText active={active} name="notifications">Уведомления</FooterText>
                </FooterButton>
                <FooterButton onPress={() => handlePress('options')} vertical>
                    <FooterIcon title="options" active={active} type="FontAwesome" name="gear" />
                    <FooterText active={active} name="options">Настройки</FooterText>
                </FooterButton>
            </FootTab>
        </Footer>
    )
}