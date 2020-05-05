import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { View, Text, Spinner, Button } from 'native-base'
import { StatusBar, ScrollView, Image, ImageBackground } from 'react-native'
import { useUpdate } from './store/updateStore'
import theme from '../theme/theme'

const Loading = styled(Spinner)`
    margin: auto;
`
const Background = styled.View`
    flex:1;
    background: ${props => props.theme.secondary.main};
`

const UpperView = styled.View`
    justify-content: center;
    flex-direction: row;
    height: 250px;
    flex: 1;
`

const BackgroundImage = styled.ImageBackground`
    flex: 1;
`

const DownView = styled.View`
    flex: 1;
    background: ${props => props.theme.secondary.main};
    padding-top: 140px;
    padding-bottom: 20px;
`

const Scroll = styled(ScrollView)`
    flex: 1;
`

const BookImage = styled.Image`
    width: ${props => props.size * 4 / 6}px;
    height: ${props => props.size}px;
    z-index: 2;
`

const ImageWrapper = styled.View`
    position: absolute;
    bottom: -140px;
    z-index: 2;
    border-width: 6px;
    border-color: ${props => props.theme.secondary.main};
`

const BookName = styled.Text`
    color: ${props => props.theme.text.main};
    font-size: 20px;
    width: 100%;
    text-align: center;
`

const BookDescription = styled.Text`
    line-height: 19px;
    padding: 15px;
    background: ${props => props.theme.secondary.dark};
    color: ${props => props.theme.text.main};
    font-size: 13px;
    width: 95%;
    text-align: left;
    margin: auto;
    margin-top: 10px;
    border-radius: 5px;
`

const Title = styled.Text`
    background: ${props => props.theme.primary.main};
    color: ${props => props.theme.text.main};
    width: 95%;
    margin: auto;
    margin-top: 10px;
    padding-left: 5px;
    text-align: center;
    border-radius: 50px;
`

const DateUpdateBlock = styled.View`
    left: 0px;
    bottom: -85px;
    width: 84px;
    height: 50px;
    position: absolute;
    z-index: 1;
    padding: 5px;
`

const DatePublicBlock = styled.View`
    right: 0px;
    bottom: -85px;
    width: 84px;
    height: 50px;
    position: absolute;
    z-index: 1;
    padding: 5px;
`

const DateText = styled.Text`
    color: ${props => props.theme.text.main};
    text-align: center;
    font-size: 10px;
`

export default function SingleBook({ match }) {

    const [isLoading, setLoading] = useState(true)
    const getBookInfo = useUpdate('GET_BOOK')
    const [book, setBook] = useState({})

    useEffect(() => {
        getBookInfo(match.params.id)
            .then(response => {
                setBook(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    return (
        <Background>
            <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true} barStyle="light-content" />
            {isLoading ? <Loading /> :
                <Scroll>
                    <UpperView>
                        <BackgroundImage
                            blurRadius={1}
                            source={{ uri: book.avatar }} />
                        <ImageWrapper>
                            <BookImage
                                size="270"
                                resizeMode="stretch"
                                source={{ uri: book.avatar }} />
                        </ImageWrapper>
                        <DateUpdateBlock>
                            <DateText>
                                {`Последнее обновление - ${book.lastUpdate}`}
                            </DateText>
                        </DateUpdateBlock>
                        <DatePublicBlock>
                            <DateText>
                                {`Добавлена - ${book.publicDate}`}
                            </DateText>
                        </DatePublicBlock>
                    </UpperView>
                    <DownView>
                        <BookName>{book.name}</BookName>

                        <Title>{"О книге"}</Title>
                        <BookDescription>{book.about}</BookDescription>
                        <Title>{"Авторы"}</Title>
                        <BookDescription>{book.author.join(', ')}</BookDescription>
                    </DownView>
                </Scroll>
            }
        </Background>
    )
}