import { View, Text } from 'react-native'
import React from 'react'
import DataMindMap from '../../../../assets/mushaf/DataMindMap';
import MindMapSurahView from './MapItem';

const MindMapSurahList = ({item}) => {
  const mmData = DataMindMap
  const mmSurah = mmData.find(ele => ele.id === item.name.id)

  return (
    <View>
      { !mmSurah && (
        <View style={{ alignItems: "center", marginTop: 5, marginBottom: 15, opacity: 0.5 }}>
          <Text>Belum Tersedia</Text>
        </View>
      )}

      { mmSurah && mmSurah.mindMap.map((mm) => {
        return (
        <View style={{ flexDirection: 'column', flex:1 }} key={mm.id}>
          <MindMapSurahView
            item={item}
            mmItem={mm}
          />
        </View>
      )})}
    </View>
  )
}

export default MindMapSurahList