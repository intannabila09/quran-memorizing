import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity } from "react-native"
import { SurahItems } from "utils/constants";
import { useMushafState } from "context/MushafContext";
import AyahMenuButton from "components/Buttons/AyahMenuButton";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useUserData } from "context/UserDataContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { findJuzFromAyah } from 'utils/helpers'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})

const { OS: os } = Platform

const AyahMenuContent = ({ memorized = false, forwardedRef }) => {
    const {mushafState} = useMushafState()
    const { selectedAyah } = mushafState
    const [activeAyah,setActiveAyah] = useState({ surahNumber: 0, surahName: "", ayah: "" })
    const { userDataState, dispatch } = useUserData()

    const memorizeAyah = async (target) => {
        try {
            const [surahIndex,ayahNumber] = target.split(":")
            const memorizedSurah = userDataState.memorized.surah
            const memorizedJuz = userDataState.memorized.juz
            const juzOfAyah = findJuzFromAyah(surahIndex,ayahNumber)
    
            if (memorizedSurah[surahIndex]) {
                memorizedSurah[surahIndex].push(ayahNumber)
            } else {
                memorizedSurah[surahIndex] = [ayahNumber]
            }
            if (memorizedJuz[juzOfAyah]) {
                memorizedJuz[juzOfAyah] += 1
            } else {
                memorizedJuz[juzOfAyah] = 1
            }
    
            const memorizationHistory = userDataState.memorizationHistory
            if (memorizationHistory.length >= 5) memorizationHistory.shift()
            memorizationHistory.push({
                surahNumber: surahIndex,
                ayahNumber: ayahNumber,
                surahName: SurahItems[surahIndex-1].name,
                memorizedAt: new Date().getTime()
            })
    
            const newUserDataState = {
                ...userDataState,
                memorized: {
                    juz: memorizedJuz,
                    surah: memorizedSurah,
                },
                memorizationHistory: memorizationHistory
            }

            dispatch({
                action: 'SET_USER_DATA',
                payload: newUserDataState
            })  
            await AsyncStorage.setItem("userPreferences", JSON.stringify(newUserDataState))
        } catch (error) {
            console.log(error)
        }
    }

    console.log(Object.keys(userDataState))
    
    const unmemorizeAyah = (target) => {
        console.log('unmemorize', target)
        // Implement save new user data state

        // Implement save memorization history
        
        // Implement update user storage data
    }
    
    const AYAH_MENU_ITEMS = (memorized) => [
        {
            key: 'memorize',
            label: `${memorized ? 'Tandai Belum Hafal' : 'Tandai Sudah Hafal'}`,
            icon: !memorized ? <FontAwesome name="check-square-o" size={16} color="black" /> : <FontAwesome name="times-circle-o" size={16} color="black" />,
            action: memorized ? unmemorizeAyah : memorizeAyah
        },
        {
            key: 'copy',
            label: 'Salin Ayat',
            icon: <FontAwesome5 name="copy" size={16} color="black" />,
        },
        {
            key: 'note',
            label: 'Tambahkan Catatan',
            icon: <FontAwesome name="pencil-square-o" size={16} color="black" />
        },
        {
            key: 'play',
            label: 'Putar Audio',
            icon: <FontAwesome5 name="play" size={16} color="black" />
        }
    ]
    
    useEffect(() => {
        if (selectedAyah) {
            const [surahIndex,ayahNumber] = selectedAyah.split(":")
            setActiveAyah({ surahNumber: SurahItems[surahIndex-1].no, surahName: SurahItems[surahIndex-1].name, ayah: ayahNumber })
        }
    },[selectedAyah])

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
                    <Text style={{ fontSize: 18, fontWeight: "700"}}>{`${activeAyah['surahNumber']}. ${activeAyah['surahName']}: ${activeAyah['ayah']}`}</Text>
                    {
                        os === 'android' && (
                            <View
                                style={{
                                    borderWidth: 1,
                                    paddingVertical: 4,
                                    paddingHorizontal: 12,
                                    borderRadius: 999,
                                    borderColor: memorized ? "#86efac" : "#e2e8f0",
                                    backgroundColor: memorized ? "#dcfce7" : "#f1f5f9",
                                    marginTop: 8
                                }}
                            >
                                <Text style={{ fontWeight: "700", fontSize: 14, color: memorized ? "#16a34a" : "#475569", textAlign: 'center'}}>
                                    {memorized ? 'Sudah Hafal' : 'Belum Hafal'}
                                </Text>
                            </View>
                        )
                    }
                </View>
                {
                    os === 'ios' && (
                        <View
                            style={{
                                borderWidth: 1,
                                paddingVertical: 4,
                                paddingHorizontal: 12,
                                borderRadius: 999,
                                borderColor: memorized ? "#86efac" : "#e2e8f0",
                                backgroundColor: memorized ? "#dcfce7" : "#f1f5f9",
                            }}
                        >
                            <Text style={{ fontWeight: "700", fontSize: 14, color: memorized ? "#16a34a" : "#475569"}}>
                                {memorized ? 'Sudah Hafal' : 'Belum Hafal'}
                            </Text>
                        </View>
                    )
                }
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
                {AYAH_MENU_ITEMS(memorized).map(item => {
                    return (
                        <AyahMenuButton
                            menu={item}
                            key={item.key}
                            forwardedRef={forwardedRef}
                            target={selectedAyah}
                        />
                    )
                })}
            </View>
        </View>
    )
}

export default AyahMenuContent;