import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AyahPerMap from '../AyahPerMap'

const MindMapChildrenView = ({
  item, ayahList, surahNumber, 
  activeMap, setActiveMap,
  activeMapStatus,
  handleSetActiveMap = () => {},
}, index) => {
  const [viewTranslation, setViewTranslation] = useState(false)
  // const [activeMap, setActiveMap] = useState(null)
  const ayahs = ayahList.filter((ayah) => ayah.mmChildrenId === item.id)

  useEffect (() => {
    if (activeMapStatus === false) setActiveMap(null)
  })

  return (
    <View style={{ flexDirection: 'column', flex:1 }} key={index}>
      <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', marginBottom: 5, }}>
        <View 
          style={{
            height: 6, width: 6, backgroundColor: viewTranslation ? '#1DC25D' : '#FFF',
            borderColor: viewTranslation ? '#1DC25D' : '#000', borderRadius: 3, borderWidth: 1, 
            marginRight: 5, marginLeft: 20
          }}
        >    
        </View>
        <TouchableOpacity 
          onPress={() => { setViewTranslation(!viewTranslation) }}
          style={{ 
            flexDirection: 'row', flex: 1,  alignItems: 'center', paddingRight: 20,
            borderWidth: 1, borderColor: viewTranslation ? '#1DC25D' : '#e2e8f0', borderRadius: 10 
          }}
        >
          <View
            style={{
              paddingVertical: 5, paddingHorizontal: 7, marginHorizontal: 10, 
              minHeight: 28, borderRadius: 6, backgroundColor: '#1DC25D'
            }}
          >
            <AyahPerMap mmId={item.id} ayahList={ayahList} level='children' />
          </View>
          <Text style={{ paddingVertical: 12, paddingRight: 10, marginRight: 20 }}>{item.val}</Text>
        </TouchableOpacity>
      </View>

      { viewTranslation && (
        <View 
          style={{ 
            flex: 1, minHeight: 30, padding: 10,
            marginBottom: 10, marginTop: -10, marginLeft: 31,
            borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, 
            borderTopWidth: 0, borderTopEndRadius: 0, borderTopStartRadius: 0, 
          }}
        >
          {  
            ayahs.map((item) => {
              const ayah = `${surahNumber}:${item.number}`
              return (
                <TouchableOpacity 
                  style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: activeMap===item.id? 'rgba(249,205,29,0.3)' : '#FFF'}} 
                  key={item.id}
                  onPress={() => {
                    handleSetActiveMap(ayah)
                    if (activeMap!==item.id) {setActiveMap(item.id)} else {setActiveMap(null)}
                                    // setActiveMapStatus(!activeMapStatus)
                  }}
                >
                  <Text style={{ marginRight: 8, fontWeight: '600'}}>{item.number}.</Text>
                  <Text style={{ paddingRight: 15, marginRight: 8 }}>{item.translation}</Text>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )}
    </View>
  )
}

export default MindMapChildrenView