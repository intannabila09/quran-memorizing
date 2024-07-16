import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AyahPerMap from '../../AyahPerMap';
// import MindMapChildrenView from '../Children/halaman';

const MindMapHalamanView = ({
  item, mmItem,
  listAyah, surahNumber, 
  activeMap, setActiveMap,
  mapParentIdToBeShow, mapChildrenIdToBeShow,
  activeMapStatus, setActiveMapStatus,
  handleSetActiveMap = () => {}
}) => {
  const [viewChildren, setViewChildren] = useState(false)
  const ayahs = listAyah.filter((ayah) => ayah.mmParentId === mmItem.id)
          
  useEffect(() => {
    if (mapParentIdToBeShow === mmItem.id ) setViewChildren(true)
  }, [mapParentIdToBeShow])

  return (
    <View>
        <View style={{ flexDirection: 'column', flex:1 }} key={mmItem.id}>
          {/* map parent */}
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: 'center',
              marginBottom: 5
            }}
          >
            <View 
              style={{
                height: 6, width: 6, marginHorizontal: 5,
                backgroundColor: viewChildren ? '#1DC25D' : '#FFF',
                borderRadius: 3, borderWidth: 1, borderColor: viewChildren ? '#1DC25D' : '#000',
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
              <Text style={{ paddingHorizontal: 12,  paddingVertical: 12, fontWeight: '700', maxWidth: '80%' }}>{mmItem.value}</Text>
              <View 
                style={{ 
                  paddingVertical: 5, paddingHorizontal: 7, 
                  marginHorizontal: 10, height: 30, 
                  borderRadius: 6, backgroundColor: '#1DC25D' 
                }}
              >
                <AyahPerMap mmId={mmItem.id} ayahList={item.ayah} level='parent' />
              </View>
            </TouchableOpacity>
          </View>
      
          {/* map children */}
          { viewChildren && mmItem.children && (
            mmItem.children.map((itemChild) => {
              const exist = listAyah.find(item => item.mmChildrenId === itemChild.id)
              return (
                <View key={itemChild.id}>
                  { exist && (
                    <MindMapChildrenView 
                      item={itemChild} 
                      ayahList={listAyah}
                      surahNumber={surahNumber} 
                      activeMapStatus={activeMapStatus}
                      setActiveMapStatus={setActiveMapStatus}
                      activeMap={activeMap}
                      setActiveMap={setActiveMap}
                      handleSetActiveMap={handleSetActiveMap}
                      mapChildrenIdToBeShow={mapChildrenIdToBeShow}
                    />
                  )}
                </View>
              )
            })
          )}

          { viewChildren && !mmItem.children && (
            <View 
              style={{ 
                flex: 1, minHeight: 30, padding: 10,
                marginBottom: 10, marginTop: -10, marginLeft: 16,
                borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, 
                borderTopWidth: 0, borderTopEndRadius: 0, borderTopStartRadius: 0, 
              }}
            >
              {  
                ayahs.map((item) => {
                  const ayah = `${surahNumber}:${item.number}`
                  return (
                    <TouchableOpacity 
                      style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: activeMap===ayah? 'rgba(249,205,29,0.3)' : '#FFF' }} 
                      key={item.id}
                      onPress={() => {
                        handleSetActiveMap(ayah)
                        if (activeMap!==ayah) {setActiveMap(ayah)} else {setActiveMap(null)}
                        setActiveMapStatus(!activeMapStatus)
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
    </View>
  )
}

const MindMapChildrenView = ({
  item, ayahList, surahNumber, 
  activeMap, setActiveMap, 
  activeMapStatus, setActiveMapStatus,
  mapChildrenIdToBeShow,
  handleSetActiveMap = () => {},
}) => {
  const [viewTranslation, setViewTranslation] = useState(false)
  const ayahs = ayahList.filter((ayah) => ayah.mmChildrenId === item.id)

  useEffect (() => {
    if (activeMapStatus === false) setActiveMap(null)
  }, [activeMapStatus])

  useEffect(() => {
    if (mapChildrenIdToBeShow === item.id ) setViewTranslation(true)
  }, [mapChildrenIdToBeShow])

  return (
    <View style={{ flexDirection: 'column', flex:1 }}>
      <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', marginBottom: 5 }}>
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
                  style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: activeMap===ayah? 'rgba(249,205,29,0.3)' : '#FFF'}} 
                  key={item.id}
                  onPress={() => {
                    handleSetActiveMap(ayah)
                    if (activeMap!==ayah) {setActiveMap(ayah)} else {setActiveMap(null)}
                    setActiveMapStatus(!activeMapStatus)
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

export default MindMapHalamanView