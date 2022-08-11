import {
    useContext,
    createContext,
    useReducer,
} from 'react'

const UserDataContext = createContext({})

const userDataReducer = (_, {action,payload}) => {
    switch (action) {
        case 'SET_USER_DATA':
            return payload
        case 'REMOVE_USER_DATA':
            return {}
    }
}

export const UserDataProvider = ({children}) => {
    const [userDataState, dispatch] = useReducer(userDataReducer, {})
    return (
        <UserDataContext.Provider
            value={{
                userDataState,
                dispatch
            }}
        >
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => {
    const context = useContext(UserDataContext)
    return context
}