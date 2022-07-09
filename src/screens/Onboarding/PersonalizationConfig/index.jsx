import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from "react-native"
import AccentPattern from 'assets/accent-pattern.png'
import TextButton from 'components/Buttons/TextButton'
import PrimaryButton from 'components/Buttons/PrimaryButton'

import firstWord from 'assets/visibilityMode/firstWord.png'
import hideAll from 'assets/visibilityMode/hideAll.png'
import summary from 'assets/visibilityMode/summary.png'

import {
    TikrarDuration,
    TikrarMethod,
    TikrarCount,
    AyahVisibilityMode,
} from 'utils/constants'

import DropDownPicker from 'react-native-dropdown-picker'

/**
 * Todo
 * Create custom theme for dropdown
 * https://github.com/hossein-zare/react-native-dropdown-picker/blob/5.x/src/themes/light/index.js
 */

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

const PersonalizationConfig = ({ navigation }) => {
    const [activeOption, setActiveOption] = useState('tikrarDuration')

    const [ayahVisibilityOptionsOpen, setAyahVisbilityOptionsOpen] = useState(false)
    const [ayahVisibilityValue, setAyahVisibilityValue] = useState('firstWord')

    const [tikrarModeOptionsOpen, setTikrarModeOptionsOpen] = useState(false)
    const [tikrarModeValue, setTikrarModeValue] = useState('duration')

    const [tikrarCountOptionsOpen, setTikrarCountOptionsOpen] = useState(false)
    const [tikrarCountValue, setTikrarCountValue] = useState(10)

    const [tikrarDurationOptionsOpen, setTikrarDurationOptionsOpen] = useState(false)
    const [tikrarDurationValue, setTikrarDurationValue] = useState('1min')

    useEffect(() => {
        if (ayahVisibilityOptionsOpen) setActiveOption('ayahVisibility')
        if (tikrarModeOptionsOpen) setActiveOption('tikrarMode')
        if (tikrarCountOptionsOpen) setActiveOption('tikrarCount')
        if (tikrarDurationOptionsOpen) setActiveOption('tikrarDuration')
    },[
        ayahVisibilityOptionsOpen,
        tikrarModeOptionsOpen,
        tikrarCountOptionsOpen,
        tikrarDurationOptionsOpen
    ])

    const submitMemorizingConfiguration = () => {
        const memorizingConfiguration = {
            ayahVisibilityMode: ayahVisibilityValue,
            tikrarMethod: tikrarModeValue,
            tikrarImplementation: tikrarModeValue === 'count' ? tikrarCountValue : tikrarDurationValue,
        }
        console.log(memorizingConfiguration)
        navigation.navigate('Homepage')
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', marginBottom: 40 }}>
                <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>Konfiguras Gaya Menghafal</Text>
                <Text style={{ fontSize: 14, color: '#A7A7A7' }}>Kamu dapat mengubahnya nanti di pengaturan.</Text>
            </View>
            <View style={{ position: 'relative', width: '100%', elevation: 3, zIndex: 3}}>
                <View style={{ marginBottom: 24 }}>
                    <Image
                        source={(() => {
                            switch (ayahVisibilityValue) {
                                case 'firstWord':
                                    return firstWord
                                case 'hideAll':
                                    return hideAll
                                case 'summary':
                                    return summary
                            }
                        })()}
                        style={{ width: 311, height: 135 }}
                    />
                </View>
                <View
                    style={{
                        marginBottom: 24,
                        position: 'relative',
                        zIndex: activeOption === 'ayahVisibility' ? 4 : 3,
                        elevation: activeOption === 'ayahVisibility' ? 4 : 3,
                    }}
                >
                    <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600'}}>Mode Tutup Ayat</Text>
                    <DropDownPicker
                        open={ayahVisibilityOptionsOpen}
                        value={ayahVisibilityValue}
                        items={AyahVisibilityMode}
                        setOpen={setAyahVisbilityOptionsOpen}
                        setValue={setAyahVisibilityValue}
                        style={{
                            borderWidth: 1,
                            borderColor: '#D6D6D6',
                            borderRadius: 8,
                            backgroundColor: '#FBFBFB',
                        }}
                        textStyle={{
                            fontWeight: '600'
                        }}
                    />
                </View>
                <View
                    style={{
                        marginBottom: 24,
                        position: 'relative',
                        zIndex: activeOption === 'tikrarMode' ? 4 : 3,
                        elevation: activeOption === 'tikrarMode' ? 4 : 3,
                    }}>
                    <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600'}}>Metode Tikrar</Text>
                    <DropDownPicker
                        open={tikrarModeOptionsOpen}
                        value={tikrarModeValue}
                        items={TikrarMethod}
                        setOpen={setTikrarModeOptionsOpen}
                        setValue={setTikrarModeValue}
                        style={{
                            borderWidth: 1,
                            borderColor: '#D6D6D6',
                            borderRadius: 8,
                            backgroundColor: '#FBFBFB',
                        }}
                        textStyle={{
                            fontWeight: '600'
                        }}
                    />
                </View>
                {
                    tikrarModeValue === 'duration' && (
                        <View
                            style={{
                                marginBottom: 24,
                                position: 'relative',
                                zIndex: activeOption === 'tikrarDuration' ? 4 : 3,
                                elevation: activeOption === 'tikrarDuration' ? 4 : 3,
                            }}
                        >
                            <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600'}}>Durasi Tikrar</Text>
                            <DropDownPicker
                                open={tikrarDurationOptionsOpen}
                                value={tikrarDurationValue}
                                items={TikrarDuration}
                                setOpen={setTikrarDurationOptionsOpen}
                                setValue={setTikrarDurationValue}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#D6D6D6',
                                    borderRadius: 8,
                                    backgroundColor: '#FBFBFB',
                                }}
                                textStyle={{
                                    fontWeight: '600'
                                }}
                            />
                        </View>
                    )
                }
                {
                    tikrarModeValue === 'count' && (
                        <View
                            style={{
                                marginBottom: 24,
                                position: 'relative',
                                zIndex: activeOption === 'tikrarCount' ? 4 : 3,
                                elevation: activeOption === 'tikrarCount' ? 4 : 3,
                                
                            }}
                        >
                            <Text style={{ fontSize: 16, marginBottom: 8, fontWeight: '600'}}>Jumlah Tikrar</Text>
                            <DropDownPicker
                                open={tikrarCountOptionsOpen}
                                value={tikrarCountValue}
                                items={TikrarCount}
                                setOpen={setTikrarCountOptionsOpen}
                                setValue={setTikrarCountValue}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#D6D6D6',
                                    borderRadius: 8,
                                    backgroundColor: '#FBFBFB',
                                }}
                                textStyle={{
                                    fontWeight: '600'
                                }}
                            />
                        </View>
                    )
                }
                <PrimaryButton
                    title="Selesai"
                    onPress={submitMemorizingConfiguration}
                />
                <TextButton title="Sebelumnya" style={{ paddingTop: 20 }} onPress={() => navigation.goBack()}/>
            </View>
            <View
                style={{
                    position: 'absolute',
                    elevation: 1,
                    zIndex: 1,
                    right: 0,
                    bottom: 0
                }}
            >
                <Image source={AccentPattern} />
            </View>
        </View>
    )
}

export default PersonalizationConfig;