import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AyahPerMap from '../AyahPerMap'

const MindMapChildrenView = ({item, ayahList}, index) => {
  const [viewTranslation, setViewTranslation] = useState(false)
  const ayahs = ayahList.filter((ayah) => ayah.mmChildrenId === item.id)

  return (
    <View style={{ flexDirection: 'column', flex: 1 }} key={index}>
      <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', marginBottom: 5 }}>
        <View 
          style={{
            height: 6, width: 6, marginRight: 5, marginLeft: 20,
            backgroundColor: viewTranslation ? '#1DC25D' : '#FFF',
            borderColor: viewTranslation ? '#1DC25D' : '#000', borderRadius: 3, borderWidth: 1, 
          }}
        >    
        </View>
        <TouchableOpacity 
          onPress={() => { setViewTranslation(!viewTranslation) }}
          style={{ 
            flexDirection: 'row', flex: 1,
            borderWidth: 1, borderColor: viewTranslation ? '#1DC25D' : '#e2e8f0', borderRadius: 10,
            alignItems: 'center', paddingRight: 20 
          }}
        >
          <View
            style={{
              paddingVertical: 5, paddingHorizontal: 7, marginHorizontal: 10, 
              minHeight: 28, borderRadius: 6, backgroundColor: '#1DC25D',
            }}
          >
            <AyahPerMap mmId={item.id} ayahList={ayahList} level='children' />
          </View>
          <Text style={{ paddingVertical: 12, paddingRight: 10, marginRight: 20 }}>{item.val}</Text>
        </TouchableOpacity>
      </View>

      { viewTranslation && (
        <TouchableOpacity 
          style={{ 
            flex: 1, minHeight: 30, padding: 10,
            marginBottom: 10, marginTop: -10, marginLeft: 31,
            borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, 
            borderTopWidth: 0, borderTopEndRadius: 0, borderTopStartRadius: 0,
          }}
        >
          {  
            ayahs.map((item) => {
              return (
                <View style={{ flexDirection: 'row', marginVertical: 5, }} key={item.id}>
                  <Text style={{ marginRight: 8, fontWeight: '600'}}>{item.number}.</Text>
                  <Text style={{ paddingRight: 15, marginRight: 8 }}>{item.translation}</Text>
                </View>
              )
            })
          } 
        </TouchableOpacity>
      )}
    </View>
  )
}

export default MindMapChildrenView