import { useState } from 'react'
import { View, Text, FlatList, SafeAreaView } from 'react-native'
import { SurahItems } from 'utils/constants';

import ProgressSurahItem from './Item'

const renderList = (surah) => <ProgressSurahItem surah={surah} />

const SurahProgressList = ({
    sortBy = 'number',
    search = null,
}) => {
    const [surahList,setSurahList] = useState(SurahItems);

    return (
        <View style={{ backgroundColor: '#FFFFFF'}}>
            <FlatList
                data={!search ? surahList : surahList.filter(surah => surah.name.toLowerCase().includes(search.toLowerCase()))}
                renderItem={renderList}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default SurahProgressList;