import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Spinner, Container } from 'native-base'
import BookItem from './BookItem'
import { useUpdate } from './store/updateStore'
import { FlatList } from 'react-native'
import theme from '../theme/theme'

const Loading = styled(Spinner)`
    margin: auto;
`

export default function BookPage() {

    const [isLoading, setLoading] = useState(true)
    const books = useSelector(state => state.bookList)
    const updateBooks = useUpdate('BOOKS')

    useEffect(() => {
        updateBooks()
        setLoading(false)
    }, [])


    return (
        isLoading ? <Loading /> :
            <FlatList
                data={books}
                keyExtractor={item => item.id.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                    <BookItem
                        id={item.id}
                        avatar={item.avatar}
                        name={item.name}
                        amount={item.amount}
                        key={item.id} />
                )} />
    )
}