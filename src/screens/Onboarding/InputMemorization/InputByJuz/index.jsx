import { View, StyleSheet, Image, Text } from 'react-native'
import TextButton from 'components/Buttons/TextButton'
import PrimaryButton from 'components/Buttons/PrimaryButton'
import AccentPattern from 'assets/accent-pattern.png'
import CheckableListInput from 'components/CheckableListInput'

import { JuzItems } from 'utils/constants'
import JuzInputListItem from 'components/JuzInputListItem';

import { useOnBoardingState } from '../../../../context/OnBoardingContext'

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
                <PrimaryButton title="Selanjutnya" />
                <TextButton title="Sebelumnya" style={{ paddingTop: 20 }} onPress={() => navigation.goBack()}/>
            </View>
            <View style={{ position: 'absolute', zIndex: 1, elevation: 1, right: 0, bottom: 0 }}>
                <Image source={AccentPattern} />
            </View>
        </View>
    )
}

export default InputByJuz;