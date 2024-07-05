import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import DataMindMap from '../../../../assets/mushaf/DataMindMap';
import AyahPerMap from '../AyahPerMap';
// import MindMapChildrenView from '../Children/surah';

const MindMapSurahView = ({item}) => {
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
        const [viewChildren, setViewChildren] = useState(false)
        const ayahs = item.ayah.filter((ayah) => ayah.mmParentId === mm.id)

        return (
        <View style={{ flexDirection: 'column', flex:1 }} key={mm.id}>
          {/* map parent */}
          <View
            style={{
              flexDirection: "row", flex: 1,
              alignItems: 'center', marginBottom: 5
            }}
          >
            <View 
              style={{
                height: 6, width: 6, marginHorizontal: 5,
                backgroundColor: viewChildren ? '#1DC25D' : '#FFF',
                borderRadius: 3, borderWidth: 1, borderColor: viewChildren ? '#1DC25D' : '#000'
              }}
            >
            </View>
            <TouchableOpacity 
              onPress={() => { setViewChildren(!viewChildren) }} 
              style={{ 
                flexDirection: 'row', flex: 1,
                borderWidth: 1, borderColor: viewChildren ? '#1DC25D' : '#e2e8f0', borderRadius: 10,
                justifyContent: 'space-between', alignItems: 'center' 
              }}
            >
              <Text style={{ paddingHorizontal: 12,  paddingVertical: 12, fontWeight: '700', maxWidth: '80%' }}>{mm.value}</Text>
              <View 
                style={{ 
                  paddingVertical: 5, paddingHorizontal: 7, 
                  marginHorizontal: 10, height: 30, 
                  borderRadius: 6, backgroundColor: '#1DC25D' 
                }}
              >
                <AyahPerMap mmId={mm.id} ayahList={item.ayah} level='parent' />
              </View>
            </TouchableOpacity>
          </View>
      
          {/* map children */}
          { viewChildren && mm.children && (
            mm.children.map((itemChild) => (
              <MindMapChildrenView item={itemChild} ayahList={item.ayah} />
            ))
          )}

          { viewChildren && !mm.children && (
            <TouchableOpacity 
              style={{ 
                flex: 1, minHeight: 30, padding: 10,
                marginBottom: 10, marginTop: -10, marginLeft: 16,
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
      )})}
    </View>
  )
}

const MindMapChildrenView = ({item, ayahList}) => {
  const [viewTranslation, setViewTranslation] = useState(false)
  const ayahs = ayahList.filter((ayah) => ayah.mmChildrenId === item.id)

  return (
    <View style={{ flexDirection: 'column', flex:1 }} key={item.id}>
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

export default MindMapSurahView