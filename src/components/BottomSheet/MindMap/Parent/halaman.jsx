import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DataMindMap from '../../../../assets/mushaf/DataMindMap';
import AyahPerMap from '../AyahPerMap';
// import MindMapChildrenView from '../Children/halaman';

const MindMapHalamanView = ({
  item, listAyah, surahId, surahNumber, 
  activeMapAyah, activeMapStatus, setActiveMapStatus,
  handleSetActiveMap = () => {}
}) => {
  const [activeMap, setActiveMap] = useState(null)
  const mmData = DataMindMap
  const mmHalaman = useMemo(() => {
    const listMMId = []
    listAyah.map((i) => { listMMId.push(i.mmParentId) })

    const activeMapSurah = mmData.find(ele => ele.id === surahId)
    const listMM = []
    { activeMapSurah && activeMapSurah.mindMap.map((j) => {
        const exist = listMMId.find(ele => ele === j.id)
        if (exist) {listMM.push(j)}
      })
    }

    if (listMM.length != 0) {return listMM} 
    else {return null}
  })
  // const [activeMapAyahNum, setActiveMapAyahNum] = useState(null)
  const [mapParentIdToBeShow, setMapParentIdToBeShow] = useState(null)
  const [mapChildrenIdToBeShow, setMapChildrenIdToBeShow] = useState(null)

  useEffect (() => {
    if (activeMapStatus === false) setActiveMap(null)
  }, [activeMapStatus])

  useEffect (() => {
    if (activeMapAyah) {
      setActiveMap(activeMapAyah)
      
      const ayah = item.ayah.find(i => i.number === Number(activeMapAyah.split(':')[1]))
      setMapParentIdToBeShow(ayah.mmParentId)
      setMapChildrenIdToBeShow(ayah.mmChildrenId)
    }
    else {
      setActiveMap(null)
    }
  }, [activeMapAyah])

  // console.log(activeMap)
  // console.log(activeMapAyah)

  return (
    <View>
      { !mmHalaman && (
        <View style={{ alignItems: "center", marginTop: 5, marginBottom: 15, opacity: 0.5 }}>
          <Text>Belum Tersedia</Text>
        </View>
      )}

      { mmHalaman && mmHalaman.map((mmItem) => {
        const [viewChildren, setViewChildren] = useState(false)
        const ayahs = listAyah.filter((ayah) => ayah.mmParentId === mmItem.id)
          
        useEffect(() => {
          if (mapParentIdToBeShow === mmItem.id ) setViewChildren(true)
        }, [mapParentIdToBeShow])

        return (
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
      )})}
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

  // console.log(viewTranslation)

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