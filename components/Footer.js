import React, { useState } from 'react'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import styled from 'styled-components'

const FootTab = styled(FooterTab)`
    border: 0px;
    background: ${props => props.theme.secondary.main};
`

const FooterIcon = styled(Icon)`
    ${props => props.name === props.active && `
        color: ${props.theme.primary.main}
        transform: scale(1.2);
    `}
`
const FooterText = styled(Text)`
    ${props => props.name === props.active && `
    color: ${props.theme.primary.main}
    transform: scale(1.2);
    `}
`

const FooterButton = styled(Button)`
    height: 100%;
    border-radius: 0px;
`

export default function MainFooter() {

    const [active, setActive] = useState('apps')

    const handlePress = (name) => {
        setActive(name)
    }

    return (
        <Footer>
            <FootTab>
                <FooterButton onPress={() => handlePress('apps')} vertical>
                    <FooterIcon active={active} name="apps"/>
                    <FooterText active={active} name="apps">Apps</FooterText>
                </FooterButton>
                <FooterButton onPress={() => handlePress('camera')} vertical>
                    <FooterIcon active={active} name="camera" />
                    <FooterText active={active} name="camera">Camera</FooterText>
                </FooterButton>
                <FooterButton onPress={() => handlePress('navigate')} vertical>
                    <FooterIcon active={active} name="navigate" />
                    <FooterText active={active} name="navigate">Navigate</FooterText>
                </FooterButton>
                <FooterButton onPress={() => handlePress('person')} vertical>
                    <FooterIcon active={active} name="person" />
                    <FooterText active={active} name="person">Contact</FooterText>
                </FooterButton>
            </FootTab>
        </Footer>
    )
}