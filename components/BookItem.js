import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dimensions, Animated, Easing, TouchableOpacity } from "react-native";
import theme from '../theme/theme'
import { Spinner } from 'native-base'
import { useUpdate } from './store/updateStore'
import { Link } from 'react-router-native';

const AnimatedView = (props) => {
    const anim = useRef(new Animated.Value(0)).current
    const translate = useRef(new Animated.Value(25)).current

    useEffect(() => {
        Animated.timing(anim,
            {
                toValue: 1,
                duration: 500,
            }
        ).start();
        Animated.timing(translate, {
            toValue: 0,
            duration: 1000
        }).start();
    }, [])

    return (
        <Animated.View
            style={{
                ...props.style,
                opacity: anim,
                translateY: translate,
                easing: Easing.out(),
            }}
        >
            {props.children}
        </Animated.View>
    );
}

const BookImage = styled.Image`
    flex: 4;
    border-radius: 0px;
`
const BottomPanel = styled.View`
    flex: 1.2;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: ${props => props.theme.secondary.main};
`

const BookText = styled.Text`
    flex: 10;
    margin-top: 2px;
    margin-left: 5px;
    margin-right: 20px;
    font-size: 10px;
    color: ${props => props.theme.text.main};
`

const Loading = styled(Spinner)`
    margin: auto;
`

const BookStat = styled.View`
    flex: 1;
    width: 100%;
    height: 100%;
    flex-direction: row;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
`

const Reserved = styled.View`
    flex: ${props => props.count};
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 3px;
    background: ${props => props.theme.error.main};
`

const Free = styled.View`
    flex: ${props => props.count};
    width: 100%;
    height: 100%;
    border-bottom-right-radius: 3px;
    background: ${props => props.theme.success.main};
`

export default function BookItem({ id, avatar, name, amount }) {

    const [isLoading, setLoading] = useState(true)

    const screenWidth = Math.round(Dimensions.get('window').width);
    const getReservedCount = useUpdate("BOOK_READING_STAT")
    const [reservedCount, setReservedCount] = useState(0)

    const styles = {
        width: (screenWidth - 18) / 3,
        height: 220,
        backgroundColor: theme.first.background.highlight,
        margin: 3,
        borderRadius: 3,
        translateY: 25,
    }

    useEffect(() => {
        getReservedCount(id)
            .then(response => {
                setReservedCount(response.data.length)
                setLoading(false)
            })
    }, [])

    return (
        <Link component={TouchableOpacity} activeOpacity={0.8} to={`/book/${id}`}>
            <AnimatedView style={styles}>
                {isLoading ? <Loading /> :
                    <>
                        <BookImage
                            resizeMode="stretch"
                            source={{ uri: avatar }} />
                        <BottomPanel>
                            <BookText numberOfLines={2}>{name}</BookText>
                            <BookStat>
                                <Reserved count={reservedCount}></Reserved>
                                <Free count={amount}></Free>
                            </BookStat>
                        </BottomPanel>
                    </>
                }
            </AnimatedView >
        </Link >
    )
}