import axios from 'axios'
import { useDispatch } from 'react-redux'


export function useUpdate(type) {

    const dispatch = useDispatch()

    const user = () =>
        axios
            .get('/api/user/info')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_USER", user: response.data })
                }
            })
            .catch(error => {
                console.log('User not logged in')
            })

    const userList = () =>
        axios
            .get('/api/users/')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_USERLIST", userList: response.data })
                }
            })
            .catch(error => {
                console.log('Ошибка при получении списка пользователей', error)
            })

    const bookList = () =>
        axios
            .get('/api/books/')
            .then((response) => {
                if (response.status === 200) {
                    dispatch({ type: "SET_BOOKS", books: response.data })
                }
            })
            .catch(error => {
                console.log('Cant get books')
            })

    switch (type) {
        case 'USER':
            return user
        case 'USERLIST':
            return userList
        case 'BOOKS':
            return bookList
        default:
            return false
    }
}
