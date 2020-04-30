import React, { useEffect, useState } from 'react';
import theme from './theme/theme'
import Routes from './components/Routes'
import { ThemeProvider } from 'styled-components/native'
import { createStore } from "redux"
import { Provider, useSelector } from "react-redux"
import { reducer } from './components/store/reducer'
import axios from 'axios'
import { serverUrl } from './config'
import * as Font from "expo-font"
import { ActivityIndicator } from 'react-native'
import commonColor from './native-base-theme/variables/commonColor'
import { StyleProvider } from 'native-base'
import getTheme from './native-base-theme/components';

const currentTheme = theme.first
const store = createStore(reducer)

axios.defaults.baseURL = serverUrl
axios.defaults.headers.post['Content-Type'] = 'application/JSON';
axios.defaults.headers.get['Content-Type'] = 'application/JSON';
axios.defaults.withCredentials = true

export default function App() {

    const [isReady, setReady] = useState(false)

    useEffect(() => {
        async function loadFont() {
            await Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
            });
            setReady(true)
        }
        loadFont()
    }, [])

    return (
        isReady ?
            <StyleProvider style={getTheme(commonColor)}>
                <Provider store={store}>
                    <ThemeProvider theme={currentTheme}>
                        <Routes />
                    </ThemeProvider>
                </Provider>
            </StyleProvider> : <ActivityIndicator />
    );
}
