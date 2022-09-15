import { View, StyleSheet, Image, Text } from 'react-native'
import TextButton from 'components/Buttons/TextButton'
import PrimaryButton from 'components/Buttons/PrimaryButton'
import AccentPattern from 'assets/accent-pattern.png'
import CheckableListInput from 'components/CheckableListInput'
import { useUserData } from 'context/UserDataContext'

import { JuzItems } from 'utils/constants'
import JuzInputListItem from 'components/JuzInputListItem';

import { useOnBoardingState } from 'context/OnBoardingContext'

import { useEffect } from 'react'
import _ from 'lodash'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
        paddingBottom: 50,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
    }
})


const InputByJuz = ({ navigation }) => {
    const { onBoardingState, dispatch } = useOnBoardingState()
    const { userDataState } = useUserData()

    const renderJuzItem = (juz) => {
        return (
            <JuzInputListItem
                juz={juz}
                checked={onBoardingState?.memorized?.juz?.includes(juz.item.id)}
                onPress={() => {
                    const memorized = onBoardingState?.memorized?.juz?.includes(juz.item.id)
                    switch(memorized) {
                        case true:
                            dispatch({
                                action: 'REMOVE_JUZ',
                                payload: juz.item.id
                            })
                            break;
                        case false:
                            dispatch({
                                action: 'ADD_JUZ',
                                payload: juz.item.id
                            })
                        default:
                            break;
                    }
                }}
            />
        )
    }
    
    useEffect(() => {
        const populateOnBoardingData = () => {
            const initialUsage = _.isEmpty(userDataState)
            if (!initialUsage) {
                const memorizedJuz = Object.keys(userDataState?.memorized?.juz).map((juz) => {
                    if (
                        userDataState?.memorized?.juz[juz] ===
                        JuzItems[String(Number(juz) - 1)]?.numberOfAyah
                    ) return juz
                    return null
                }).filter((juz) => !!juz)
                .map((item) => `juz${item}`)
                
                dispatch({
                    action: 'ADD_BULK_JUZ',
                    payload: memorizedJuz
                })
            }
        }

        populateOnBoardingData()
    },[])

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', position: 'relative', zIndex: 3, elevation: 3 }}>
                <Text style={{ marginBottom: 24, fontSize: 32, fontWeight: 'bold'}}>Pilih Juz yang sudah kamu hafalkan</Text>
                <CheckableListInput
                    style={{
                        height: 310,
                        marginBottom: 24
                    }}
                    renderItem={renderJuzItem}
                    items={JuzItems}
                />
                <PrimaryButton title="Selanjutnya" onPress={() => navigation.navigate('PersonalizationConfig') }/>
                <TextButton title="Sebelumnya" style={{ paddingTop: 20 }} onPress={() => navigation.goBack()}/>
            </View>
            <View style={{ position: 'absolute', zIndex: 1, elevation: 1, right: 0, bottom: 0 }}>
                <Image source={AccentPattern} />
            </View>
        </View>
    )
}

export default InputByJuz;