import { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { SurahItems } from 'utils/constants';
import { useUserData } from 'context/UserDataContext'

import ProgressSurahItem from './Item'

const renderList = (surah) => <ProgressSurahItem surah={surah} />

const generateSurahNameAliases = (surahName) => {
    return [
        surahName.toLowerCase(),
        surahName.toLowerCase().replace(/[^a-z]/gi, ''),
    ]
}

const SurahProgressList = ({
    sortParam = 'number',
    search = null,
}) => {
    const [surahList,setSurahList] = useState([]);
    const {userDataState} = useUserData()

    useEffect(() => {
        if (userDataState?.memorized?.surah) {
            const newSurahList = SurahItems.reduce((acc,cur) => {
                const memorized = 
                    userDataState.memorized.surah[cur.no] ?
                        userDataState.memorized.surah[cur.no].length : 0
                return [
                    ...acc,
                    {
                        ...cur,
                        memorized,
                    }
                ]
            }, [])
            setSurahList(newSurahList)
        } else {
            setSurahList(SurahItems)
        }
    },[userDataState])

    return (
        <View style={{ backgroundColor: '#FFFFFF'}}>
            <FlatList
                data={!search
                    ? surahList
                    : surahList.filter(
                        surah => {
                            const aliases = generateSurahNameAliases(surah.name)
                            return aliases.some(alias => alias.includes(search.toLowerCase()))
                        })}
                renderItem={renderList}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default SurahProgressList;