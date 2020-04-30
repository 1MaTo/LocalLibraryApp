import React from 'react'
import { Button } from 'react-native-material-ui'

export default ColoredButton = (color, text) => {
    return (
        <Button raised text={text}
            style={{ container: { backgroundColor: color} }} />)
}