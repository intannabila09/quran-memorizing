import {
    useContext,
    createContext,
    useReducer,
} from 'react'
import { VISIBILITY_MODE } from '../../utils/enums'

const MushafContext = createContext({})

const initialMushafState = {
    count: 0,
    tikrarMethod: 'count',
    // Normal Setting
    // visibilityMode: VISIBILITY_MODE[0]
    // First Word Development
    visibilityMode: VISIBILITY_MODE[1]
    // Invisible Development
    // visibilityMode: VISIBILITY_MODE[2]
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
        case 'TOGGLE_VIEW_MODE':
            const currentIndex = VISIBILITY_MODE.indexOf(state.visibilityMode)
            const newIndex = currentIndex === VISIBILITY_MODE.length - 1 ? 0 : currentIndex + 1
            return {
                ...state,
                visibilityMode: VISIBILITY_MODE[newIndex],
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