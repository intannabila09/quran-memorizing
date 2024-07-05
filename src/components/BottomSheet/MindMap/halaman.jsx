import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DataMindMap from '../../../assets/mushaf/DataMindMap';
import AyahPerMap from './AyahPerMap';

const MindMapHalamanView = ({
    item, listAyah, surahId, surahNumber, activeMapStatus,
    handleSetActiveMap = () => {}
}) => {
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

        return listMM ?? ''
    })

    const [activeMap, setActiveMap] = useState(null)
    // const [activeMapStatus, setActiveMapStatus] = useState(false)
    // console.log(activeMapStatus)
    // console.log(activeMap)

    useEffect (() => {
        if (activeMapStatus === false) setActiveMap(null)
    })

  return (
    <View>
        { mmHalaman && mmHalaman.map((mmItem) => {
          const [viewChildren, setViewChildren] = useState(false)
          const ayahs = listAyah.filter((ayah) => ayah.mmParentId === mmItem.id)
          
          return (
          <View style={{ flexDirection: 'column', flex:1 }}>
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
                          height: 6,
                          width: 6, 
                          backgroundColor: viewChildren ? '#1DC25D' : '#FFF',
                          borderRadius: 3,
                          borderWidth: 1,
                          borderColor: viewChildren ? '#1DC25D' : '#000',
                          marginHorizontal: 5
                      }}
                  >
                  </View>
              
                  <TouchableOpacity 
                      onPress={() => {
                          setViewChildren(!viewChildren)
                      }} 
                      style={{ flexDirection: 'row', borderWidth: 1, borderColor: viewChildren ? '#1DC25D' : '#e2e8f0', borderRadius: 10, flex: 1, justifyContent: 'space-between', alignItems: 'center' }}
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
              {viewChildren && mmItem.children && (
                  mmItem.children.map((itemChild) => {
                      const exist = listAyah.find(item => item.mmChildrenId === itemChild.id)
                      return (
                        <View>
                            { exist && (
                                <MindMapChildrenView item={itemChild} ayahList={listAyah} handleSetActiveMap={handleSetActiveMap} surahNumber={surahNumber} activeMapStatus={activeMapStatus} />
                            )}
                        </View>
                      )
                  })
              )}

              {viewChildren && !mmItem.children && (
                    <View 
                        
                        style={{ 
                            flex: 1, minHeight: 30, padding: 10,
                            marginBottom: 10, marginTop: -10, marginLeft: 16,
                            borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, 
                            borderTopWidth: 0, borderTopEndRadius: 0, borderTopStartRadius: 0, 
                        }}
                    >
                    {  
                        ayahs.map((item, index) => {
                            const ayah = `${surahNumber}:${item.number}`
                            // const [activeMap, setActiveMap] = useState(false)
                            return (
                                <TouchableOpacity 
                                    style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: activeMap===index? 'rgba(249,205,29,0.3)' : '#FFF' }} 
                                    key={item.id}
                                    onPress={() => {
                                        handleSetActiveMap(ayah)
                                        if (activeMap!==index) {setActiveMap(index)} else {setActiveMap(null)}
                                        // setActiveMapStatus(!activeMapStatus)
                                    }}
                                >
                                    <Text style={{ marginRight: 8, fontWeight: '600'}}>{item.number}.</Text>
                                    <Text style={{ paddingRight: 15, marginRight: 8 }}>
                                        {item.translation}
                                    </Text>
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
    item, ayahList, handleSetActiveMap, surahNumber, activeMapStatus
    }, index
) => {
  const [viewTranslation, setViewTranslation] = useState(false)
  const [activeMap, setActiveMap] = useState(null)
  const ayahs = ayahList.filter((ayah) => ayah.mmChildrenId === item.id)

  useEffect (() => {
    if (activeMapStatus === false) setActiveMap(null)
  })

  return (
      <View style={{ flexDirection: 'column', flex:1 }}>
              <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', marginBottom: 5 }}>
                  <View 
                      style={{
                          height: 6, width: 6, 
                          backgroundColor: viewTranslation ? '#1DC25D' : '#FFF',
                          borderColor: viewTranslation ? '#1DC25D' : '#000',
                          borderRadius: 3, borderWidth: 1, 
                          marginRight: 5, marginLeft: 20
                      }}
                  >    
                  </View>
                  <TouchableOpacity 
                      onPress={() => {
                          setViewTranslation(!viewTranslation)
                      }}
                      style={{ flexDirection: 'row', borderWidth: 1, borderColor: viewTranslation ? '#1DC25D' : '#e2e8f0', borderRadius: 10, flex: 1,  alignItems: 'center', paddingRight: 20 }}
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

              {viewTranslation && (
                  <View 
                  style={{ 
                      flex: 1, minHeight: 30, padding: 10,
                      marginBottom: 10, marginTop: -10, marginLeft: 31,
                      borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 10, 
                      borderTopWidth: 0, borderTopEndRadius: 0, borderTopStartRadius: 0, 
                  }}
              >
                  {  
                    ayahs.map((item, index) => {
                        const ayah = `${surahNumber}:${item.number}`
                        return (
                            <TouchableOpacity 
                                style={{ flexDirection: 'row', marginVertical: 5, backgroundColor: activeMap===index? 'rgba(249,205,29,0.3)' : '#FFF'}} 
                                key={item.id}
                                onPress={() => {
                                    handleSetActiveMap(ayah)
                                    if (activeMap!==index) {setActiveMap(index)} else {setActiveMap(null)}
                                    // setActiveMapStatus(!activeMapStatus)
                                }}
                            >
                                <Text style={{ marginRight: 8, fontWeight: '600'}}>{item.number}.</Text>
                                <Text style={{ paddingRight: 15, marginRight: 8 }}>
                                    {item.translation}
                                </Text>
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