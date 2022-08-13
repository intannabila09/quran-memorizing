import { useState, useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { JuzItems } from 'utils/constants'

import ProgressJuzItem from './Item'
import { useUserData } from 'context/UserDataContext'

const renderList = (juz) => <ProgressJuzItem juz={juz} />

const JuzProgressList = ({
    sortBy = 'number',
}) => {
    const [juzList,setJuzList] = useState([])
    const { userDataState } = useUserData()

    useEffect(() => {
        if (userDataState?.memorized?.juz) {
            const newJuzList = JuzItems.reduce((acc,cur) => {
                const memorized =
                    userDataState.memorized.juz[cur.id.replace(/^juz/,'')] || 0
                return [
                    ...acc,
                    {
                        ...cur,
                        memorized,
                    }
                ]
            },[])
            setJuzList(newJuzList)
        } else {
            setJuzList(JuzItems)
        }
    },[userDataState])

    return (
        <View style={{ backgroundColor: '#FFFFFF'}}>
            <FlatList
                data={juzList}
                renderItem={renderList}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default JuzProgressList;