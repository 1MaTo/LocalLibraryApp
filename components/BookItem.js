import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Container, Text, Button } from 'native-base'
import { Dimensions, Animated, Easing, EdgeInsetsPropType } from "react-native";
import { Redirect } from 'react-router-native';
import theme from '../theme/theme'
import { Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { Spinner } from 'native-base'

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
    margin-top: 2px;
    margin-left: 5px;
    margin-right: 20px;
    font-size: 10px;
    color: ${props => props.theme.text.main};
`

const Loading = styled(Spinner)`
    margin: auto;
`

export default function BookItem({ data }) {

    const [isLoading, setLoading] = useState(true)

    const screenWidth = Math.round(Dimensions.get('window').width);

    const styles = {
        width: (screenWidth - 18) / 3,
        height: 220,
        backgroundColor: theme.first.background.highlight,
        margin: 3,
        borderRadius: 3,
        translateY: 25,
    }

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <AnimatedView style={styles}>
            {isLoading ? <Loading /> :
                <Ripple style={{ flex: 1 }} rippleDuration={700}>
                    <BookImage
                        resizeMode="stretch"
                        source={{ uri: data.avatar }} />
                    <BottomPanel>

                        <BookText numberOfLines={2}>{data.name}</BookText>
                    </BottomPanel>
                </Ripple>
            }
        </AnimatedView>
    )
}