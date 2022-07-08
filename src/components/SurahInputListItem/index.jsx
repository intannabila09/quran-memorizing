import { useState } from 'react'
import Checkbox from "expo-checkbox"
import { View, StyleSheet, Text, TouchableOpacity, Animated } from "react-native"
import { AntDesign } from '@expo/vector-icons';

import InputSuratItemPercentage from 'components/Percentage/InputSuratItemPercentage';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E6E6E6',
        width: '100%',
        borderRadius: '8px',
        marginBottom: 8,
    },
    detail_container: {
        padding: 12,
    },
    detail_container_surah: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    number_wrapper: {
        width: 32,
        height: 32,
        backgroundColor: '#F7F7F7',
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '4px',
    }
})

const AyatInSurah = ({ surahNumber = null, numberOfAyat = 0 }) => {
    if (numberOfAyat <= 0 || !surahNumber) return false
    return (
        <View>
            {Array.from({ length: numberOfAyat }, (_, i) => i + 1)
                .map((ayat) => {
                    return (
                        <View
                            key={`${surahNumber}-${ayat}`}
                            style={{
                                paddingVertical: 12,
                                paddingHorizontal: 16,
                                backgroundColor: '#FDFDFD',
                                borderTopWidth: 1,
                                borderTopColor: '#F7F7F7',
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ fontWeight: '500' }}>
                                Ayat {ayat}
                            </Text>
                            <Checkbox
                                style={{
                                    width: 16,
                                    height: 16,
                                    borderWidth: 1,
                                    borderRadius: '4px',
                                    borderColor: '#AEAEAE'
                                }}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
}

const SurahInputListItem = ({ surah }) => {
    const [showAyat, setShowAyat] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.detail_container}>
                <View style={styles.detail_container_surah}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                        <View style={styles.number_wrapper}>
                            <Text style={{ fontSize: 14, fontWeight: '600', color: '#000000'}}>
                                {surah.item.no}
                            </Text>
                        </View>
                        <View style={{ marginLeft: 12}}>
                            <Text style={{ fontSize: 14, fontWeight: '600' }}>
                                {surah.item.name}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Checkbox
                            style={{
                                width: 16,
                                height: 16,
                                borderWidth: 1,
                                borderRadius: '4px',
                                borderColor: '#AEAEAE'
                            }}
                        />
                    </View>
                </View>
                <InputSuratItemPercentage total={surah.item.numberOfAyah} />
            </View>
            {
                showAyat && (
                <View>
                    <AyatInSurah numberOfAyat={surah.item.numberOfAyah} surahNumber={surah.item.no} />
                </View>
                )
            }
            <View>
                <TouchableOpacity
                    style={{
                        padding: 12,
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderTopWidth: 1,
                        borderTopColor: '#F7F7F7',
                    }}
                    onPress={() => setShowAyat(!showAyat)}
                >
                    <Text style={{ color: '#696969'}}>
                        Lihat Ayat
                    </Text>
                    <Animated.View style={{transform: [{rotate: showAyat ? '0deg' : '180deg'}], marginLeft: 4}}>
                        <AntDesign name="caretup" size={8} color="#696969" />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SurahInputListItem;