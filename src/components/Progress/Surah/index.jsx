import { useState } from 'react'
import { View, FlatList } from 'react-native'
import { SurahItems } from 'utils/constants';

import ProgressSurahItem from './Item'

const renderList = (surah) => <ProgressSurahItem surah={surah} />

const generateSurahNameAliases = (surahName) => {
    return [
        surahName.toLowerCase(),
        surahName.toLowerCase().replace(/[^a-z]/gi, '')
    ]
}

const SurahProgressList = ({
    sortBy = 'number',
    search = null,
}) => {
    const [surahList,setSurahList] = useState(SurahItems);
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