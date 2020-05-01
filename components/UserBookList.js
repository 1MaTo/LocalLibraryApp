import React from 'react'
import styled from 'styled-components'

const Title = styled.Text`
    margin: auto;
    font-size: 24px;
    color: ${props => props.theme.primary.main};
`

export default function BookPage() {

    return(
        <Title>Welcome to user book list page</Title>
    )
}