import { useState } from 'react'
import { View, FlatList } from 'react-native'
import { JuzItems } from 'utils/constants'

import ProgressJuzItem from './Item'

const renderList = (juz) => <ProgressJuzItem juz={juz} />

const JuzProgressList = ({
    sortBy = 'number',
}) => {
    const [surahList,setSurahList] = useState(JuzItems)
    return (
        <View style={{ backgroundColor: '#FFFFFF'}}>
            <FlatList
                data={surahList}
                renderItem={renderList}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default JuzProgressList;