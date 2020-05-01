import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Spinner, Container } from 'native-base'
import BookItem from './BookItem'
import { useUpdate } from './store/updateStore'

const Loading = styled(Spinner)`
    margin: auto;
`
const ListBackground = styled(Container)`
    background: ${props => props.theme.background.main};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`

export default function BookPage() {

    const [isLoading, setLoading] = useState(true)
    const books = useSelector(state => state.bookList)
    const updateBooks = useUpdate('BOOKS')

    useEffect(() => {
        updateBooks()
        console.log(books)
        setLoading(false)
    }, [])

    return (
        isLoading ? <Loading /> : 
        <ListBackground>
            {books.map(book => <BookItem key={book.id} data={book}/>)}
        </ListBackground>
    )
}