import { useState, useEffect } from 'react'
import { View, Platform, StyleSheet, TouchableOpacity, Text } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import DropDownPicker from "react-native-dropdown-picker";
import { SurahItems } from 'utils/constants';

import {
    AVAILABLE_QARI_NAMES,
    REPEAT_OPTIONS,
    DELAY_OPTIONS
} from 'utils/enums';
import PrimaryButton from '../../Buttons/PrimaryButton';
import { generatePlaylistItems } from 'utils/helpers';
import { usePlayerProvider } from 'context/PlayerContext';

const { OS: os } = Platform

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})

const AudioConfig = ({
    forwardedRef,
    ...props
}) => {
    const { dispatch } = usePlayerProvider()
    const [optionsVisibility, setOptionsVisibility] = useState({
        startFromSurah: false,
        startFromAyah: false,
        untilSurah: false,
        untilAyah: false,
        qari: false,
        repeat: false,
        delay: false
    })
    const [startFromOptions, setStartFromOptions] = useState({
        surah: SurahItems.map((surah) => ({ value: Number(surah.no), label: surah.name})),
        ayah: []
    })
    const [startFrom, setStartFrom] = useState({
        surah: 1,
        ayah: 1
    })
    // console.log(startFromOptions.ayah)
    const [untilOptions, setUntilOptions] = useState({
        surah: SurahItems.map((surah) => ({ value: Number(surah.no), label: surah.name})),
        ayah: [],
    })
    const [until, setUntil] = useState({
        surah: 1,
        ayah: 1
    })
    const [qariOptions, setQariOptions] = useState(
        Object.keys(AVAILABLE_QARI_NAMES)
        .map((key) => ({ value: AVAILABLE_QARI_NAMES[key].id, label: AVAILABLE_QARI_NAMES[key].label }))
        )
    const [qari,setQari] = useState(qariOptions[0].value)
    const [repeatOptions, setRepeatOptions] = useState(
        Object.keys(REPEAT_OPTIONS)
        .map((key) => ({ value: REPEAT_OPTIONS[key], label: key }))
    )
    const [repeat, setRepeat] = useState(repeatOptions[0].value)
    const [delayOptions, setDelayOptions] = useState(
        Object.keys(DELAY_OPTIONS)
        .map((key) => ({ value: DELAY_OPTIONS[key], label: `${key} dtk` }))
        .sort((a, b) => a.value - b.value)
    )
    const [delay, setDelay] = useState(delayOptions[0].value)


    const handleSetOpen = (targetKey) => {
        setOptionsVisibility((prev) => {
            return {
                [targetKey]: !prev[targetKey],
                ...(
                    Object
                    .keys(prev)
                    .filter((key) => key !== targetKey)
                    .reduce((acc,cur) => {
                        acc[cur] = false
                        return acc
                    },{})
                )
            }
        })
    }

    const handlePlay = () => {
        const playlistItems = generatePlaylistItems(
            startFrom.surah,
            startFrom.ayah,
            until.surah,
            until.ayah,
            qari,
        )
        dispatch({
            type: 'SET_ALL_PLAYER_DATA',
            payload: {
                playlist: playlistItems,
                delay,
                status: 'playing',
                loop: repeat,
                index: 0,
            }
        })
        forwardedRef.current.close()
    }

    useEffect(() => {
        const numberOfAyah = SurahItems[startFrom.surah - 1].numberOfAyah
        setStartFromOptions((prev) => {
            return {
                ...prev,
                ayah: (() => {
                    const ayah = []
                    for (let i = 1; i <= numberOfAyah; i++) {
                        ayah.push({ value: i, label: i })
                    }
                    return ayah
                })()
            }
        })
        setUntilOptions((prev) => {
            return {
                ...prev,
                surah:
                    SurahItems.slice(startFrom.surah - 1)
                    .map((surah) => ({ value: Number(surah.no), label: surah.name})),
            }
        })
        setUntil((prev) => ({ ...prev, surah: startFrom.surah }))
        setStartFrom((prev) => ({ ...prev, ayah: 1 }))
    },[startFrom.surah])

    useEffect(() => {
        const numberOfAyah = SurahItems[until.surah - 1].numberOfAyah
        setUntilOptions((prev) => {
            return {
                ...prev,
                ayah: (() => {
                    const ayah = []
                    for (let i = startFrom.ayah; i <= numberOfAyah; i++) {
                        ayah.push({ value: i, label: i })
                    }
                    return ayah
                })()
            }
        })
        setUntil((prev) => ({ ...prev, ayah: startFrom.ayah }))
    },[startFrom.ayah])

    useEffect(() => {
        const numberOfAyah = SurahItems[until.surah - 1].numberOfAyah
        setUntilOptions((prev) => {
            return {
                ...prev,
                ayah: (() => {
                    const ayah = []
                    for (let i = 1; i <= numberOfAyah; i++) {
                        ayah.push({ value: i, label: i })
                    }
                    return ayah
                })()
            }
        }
        )
    },[until.surah])

    return (
        <View style={styles.container}>
             <View
                style={{
                    paddingVertical: 16,
                    paddingBottom: os === 'ios' ? 20 : 12,
                    flexDirection: "row",
                    alignItems: os === 'ios' ? 'center' : 'flex-start',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "700"}}>Pemutar Audio</Text>
                </View>
                {
                    os === 'android' && (
                        <TouchableOpacity
                            onPress={() => {
                                forwardedRef.current.close()
                            }}
                            style={{padding: 8, marginRight: -8, marginTop: -8 }}
                        >
                            <FontAwesome name="times-circle" size={24} color="black" />
                        </TouchableOpacity>
                    )
                }
            </View>
            <View>
                <View
                    style={{
                        flexDirection: "row",
                        position: 'relative',
                        zIndex: optionsVisibility.startFromSurah || optionsVisibility.startFromAyah ? 4 : 3,
                        elevation: optionsVisibility.startFromSurah || optionsVisibility.startFromAyah ? 4 : 3,
                    }}
                >
                    <View
                        style={{
                            flexGrow: 1,
                            maxWidth: '65%',
                            marginRight: 16,
                            marginBottom: 12,
                        }}
                    >
                        <Text style={{ marginBottom: 8 }}>Putar dari surat</Text>
                        <DropDownPicker
                            open={optionsVisibility.startFromSurah}
                            value={startFrom.surah}
                            items={startFromOptions.surah}
                            setOpen={() => handleSetOpen('startFromSurah')}
                            setValue={(value) => setStartFrom((prev) => ({...prev, surah: value()}))}
                            onChangeValue={() => {}}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderWidth: 0,
                            }}
                            placeholder="Surat"
                        />
                    </View>
                    <View style={{ width: '30%'}}>
                        <Text style={{ marginBottom: 8 }}>Ayat</Text>
                        <DropDownPicker
                            open={optionsVisibility.startFromAyah}
                            value={startFrom.ayah}
                            items={startFromOptions.ayah}
                            setOpen={() => handleSetOpen('startFromAyah')}
                            setValue={(value) => setStartFrom((prev) => ({...prev, ayah: value()}))}
                            onChangeValue={() => {}}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderWidth: 0,
                            }}
                            placeholder="Ayat"
                        />
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        position: 'relative',
                        zIndex: optionsVisibility.untilSurah || optionsVisibility.untilAyah ? 4 : 3,
                        elevation: optionsVisibility.untilSurah || optionsVisibility.untilAyah ? 4 : 3,
                    }}
                >
                    <View style={{
                        flexGrow: 1,
                        maxWidth: '65%',
                        marginRight: 16,
                        marginBottom: 12,
                    }}>
                        <Text style={{ marginBottom: 8 }}>Sampai surat</Text>
                        <DropDownPicker
                            open={optionsVisibility.untilSurah}
                            value={until.surah}
                            items={untilOptions.surah}
                            setOpen={() => handleSetOpen('untilSurah')}
                            setValue={(value) => setUntil((prev) => ({...prev, surah: value()}))}
                            onChangeValue={() => {}}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderWidth: 0,
                            }}
                            placeholder="Surat"
                        />
                    </View>
                    <View style={{ width: '30%'}}>
                        <Text style={{ marginBottom: 8 }}>Ayat</Text>
                        <DropDownPicker
                            open={optionsVisibility.untilAyah}
                            value={until.ayah}
                            items={untilOptions.ayah}
                            setOpen={() => handleSetOpen('untilAyah')}
                            setValue={(value) => setUntil((prev) => ({...prev, ayah: value()}))}
                            onChangeValue={() => {}}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderWidth: 0,
                            }}
                            placeholder="Ayat"
                        />
                    </View>
                </View>
                <View
                    style={{ 
                        marginBottom: 12,
                        position: 'relative',
                        zIndex: optionsVisibility.qari ? 4 : 3,
                        elevation: optionsVisibility.qari ? 4 : 3,
                    }}
                >
                    <Text style={{ marginBottom: 8 }}>Qari</Text>
                    <DropDownPicker
                        open={optionsVisibility.qari}
                        value={qari}
                        items={qariOptions}
                        setOpen={() => handleSetOpen('qari')}
                        setValue={(value) => setQari(value())}
                        onChangeValue={() => {}}
                        style={{
                            backgroundColor: '#F7F7F7',
                            borderWidth: 0,
                        }}
                        placeholder="Qari"
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        position: 'relative',
                        zIndex: optionsVisibility.repeat ? 4 : 3,
                        elevation: optionsVisibility.repeat ? 4 : 3,
                    }}
                >
                    <View style={{ flexGrow: 1, maxWidth: '65%', marginRight: '5%' }}>
                        <Text style={{ marginBottom: 8 }}>Ulangi pemutaran sebanyak</Text>
                        <DropDownPicker
                            open={optionsVisibility.repeat}
                            value={repeat}
                            items={repeatOptions}
                            setOpen={() => handleSetOpen('repeat')}
                            setValue={(value) => setRepeat(value())}
                            onChangeValue={() => {}}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderWidth: 0,
                            }}
                        />
                    </View>
                    <View style={{ flexGrow: 1, maxWidth: '30%' }}>
                        <Text style={{ marginBottom: 8 }}>Jeda tiap ayat</Text>
                        <DropDownPicker
                            open={optionsVisibility.delay}
                            value={delay}
                            items={delayOptions}
                            setOpen={() => handleSetOpen('delay')}
                            setValue={(value) => setDelay(value())}
                            onChangeValue={() => {}}
                            style={{
                                backgroundColor: '#F7F7F7',
                                borderWidth: 0,
                            }}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 12 }}>
                    <PrimaryButton
                        title="Putar"
                        onPress={handlePlay}
                    />
                </View>
            </View>
        </View>
    )
}

export default AudioConfig;