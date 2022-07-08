import {
    useContext,
    createContext,
    useReducer
} from 'react'

const OnBoardingContext = createContext({})

const initialOnBoardingState = {
    memorized: {
        juz: [],
        surah: []
    }
}

const OnBoardingStateReducer = (state,
    {
        action,
        payload
    }) => {
        switch (action) {
            case 'ADD_JUZ':
                return {
                    ...state,
                    memorized: {
                        ...state.memorized,
                        juz: [...state.memorized.juz, payload]
                    },
                }
            case 'REMOVE_JUZ':
                console.log('remove', payload)
                return {
                    ...state,
                    memorized: {
                        ...state.memorized,
                        juz: state.memorized.juz.filter(juz => juz !== payload)
                    },
                }
        }
    }

export const OnBoardingProvider = ({ children }) => {
    const [onBoardingState, dispatch] = useReducer(
        OnBoardingStateReducer,
        initialOnBoardingState
    )

    return (
        <OnBoardingContext.Provider
            value={{
                onBoardingState,
                dispatch
            }}
            >
            {children}
        </OnBoardingContext.Provider>
    )
}

export const useOnBoardingState = () => {
    const context = useContext(OnBoardingContext)
    return context
}