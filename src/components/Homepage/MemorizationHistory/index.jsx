import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import MemorizationHistoryItem from './MemorizationHistoryItem';
import { useUserData } from 'context/UserDataContext'
import { useIsFocused } from '@react-navigation/native'
import moment from 'moment';
import 'moment/locale/id'
moment.locale('id')

const MEMORIZATION_HISTORY_DATA = [
    {
        surah: 'Al-Fatihah',
        ayat: '25',
        memorizedAt: 'Baru Saja'
    },
    {
        surah: 'Al-Baqarah',
        ayat: 25,
        memorizedAt: '8 Jam yang lalu',
    },
    {
        surah: 'Al-Maidah',
        ayat: 51,
        memorizedAt: '1 Hari yang lalu',
    },
    {
        surah: 'Ad-Duha',
        ayat: 11,
        memorizedAt: '3 Hari yang lalu'
    }
]

const MemorizationHistory = () => {
    const { userDataState } = useUserData()
    const { memorizationHistory } = userDataState
    const [memorizationHistoryData,setMemorizationHistoryData] = useState([])
    const isFocused = useIsFocused()

    useEffect(() => {
        if (memorizationHistory?.length > 0) {
            setMemorizationHistoryData(memorizationHistory)
        }
    },[memorizationHistory,isFocused])

    return (
        <View style={{ marginTop: 24, paddingBottom: 50 }}>
            <Text style={{ fontSize: 18, color: '#333333', fontWeight: '500', marginBottom: 16 }}>
                Riwayat Hafalan Terakhir
            </Text>
            <View>
                {
                    memorizationHistoryData.length > 0 ? (
                        memorizationHistory.map((item,idx) => (
                            <MemorizationHistoryItem
                                surah={item.surahName}
                                ayah={item.ayahNumber}
                                memorizedAt={moment(item.memorizedAt).fromNow()}
                                key={idx} style={{ marginBottom: 8}}
                            />
                        ))
                    ) : (
                        <View
                            style={{
                                backgroundColor: '#e5e7eb',
                                borderWidth: 1,
                                borderColor: '#d1d5db',
                                padding: 12,
                                borderRadius: 4,
                            }}
                        >
                            <Text style={{ color: '#6b7280' }}>Kamu belum memiliki riwayat hafalan.</Text>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default MemorizationHistory;