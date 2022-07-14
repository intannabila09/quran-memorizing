import {
    useContext,
    createContext,
    useReducer,
} from 'react'

const MushafContext = createContext({})

const initialMushafState = {
    count: 0,
}

const MushafStateReducer = (
    state,
    {
        action,
    }
) => {
    switch (action) {
        case 'ADD_COUNT':
            return {
                ...state,
                count: state.count + 1,
            }
        case 'RESET_COUNT':
            return {
                ...state,
                count: 0,
            }
        default:
            return state
    }
}

export const MushafProvider = ({ children }) => {
    const [mushafState, dispatch] = useReducer(MushafStateReducer, initialMushafState)
    return (
        <MushafContext.Provider value={{ mushafState, dispatch }}>
            {children}
        </MushafContext.Provider>
    )
}

export const useMushafState = () => {
    const context = useContext(MushafContext)
    return context
}