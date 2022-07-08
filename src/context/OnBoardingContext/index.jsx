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
                        surah: [],
                        juz: [...state.memorized.juz, payload]
                    },
                }
            case 'REMOVE_JUZ':
                return {
                    ...state,
                    memorized: {
                        ...state.memorized,
                        juz: state.memorized.juz.filter(juz => juz !== payload)
                    },
                }
            case 'ADD_ALL_AYAH_IN_SURAH':
                return {
                    ...state,
                    memorized: {
                        juz: [],
                        surah: [
                            ...state.memorized.surah,
                            ...Array.from({ length: payload.numberOfAyah }, (_, i) => i + 1)
                            .map((ayah) => {
                                return `${payload.numberOfSurah}:${ayah}`
                            })
                        ]
                    }
                }
            case 'REMOVE_ALL_AYAH_IN_SURAH':
                return {
                    ...state,
                    memorized: {
                        juz: [],
                        surah: state.memorized.surah.filter(surah => !surah.includes(`${payload.numberOfSurah}:`))
                    }
                }
            case 'ADD_ONE_AYAH_IN_SURAH':
                return {
                    ...state,
                    memorized: {
                        juz: [],
                        surah: [
                            ...state.memorized.surah,
                            `${payload.numberOfSurah}:${payload.numberOfAyah}`,
                        ]
                    }
                }
            case 'REMOVE_ONE_AYAH_IN_SURAH':
                return {
                    ...state,
                    memorized: {
                        juz: [],
                        surah: state.memorized.surah.filter(surah => surah !== `${payload.numberOfSurah}:${payload.numberOfAyah}`),
                    }
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