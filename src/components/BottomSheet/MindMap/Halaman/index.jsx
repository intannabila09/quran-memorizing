import { View, Text } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import DataMindMap from '../../../../assets/mushaf/DataMindMap';
import MindMapHalamanView from './MapItem';

const MindMapHalamanList = ({
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

  return (
    <View>
      { !mmHalaman && (
        <View style={{ alignItems: "center", marginTop: 5, marginBottom: 15, opacity: 0.5 }}>
          <Text>Belum Tersedia</Text>
        </View>
      )}

      { mmHalaman && mmHalaman.map((mmItem) => {
        return (         
          <View style={{ flexDirection: 'column', flex:1 }} key={mmItem.id}>
            <MindMapHalamanView 
              item={item}
              mmItem={mmItem}
              listAyah={listAyah}
              surahNumber={surahNumber}
              activeMap={activeMap}
              setActiveMap={setActiveMap}
              mapParentIdToBeShow={mapParentIdToBeShow}
              mapChildrenIdToBeShow={mapChildrenIdToBeShow}
              activeMapStatus={activeMapStatus}
              setActiveMapStatus={setActiveMapStatus}
              handleSetActiveMap={handleSetActiveMap}
            />
          </View>
      )})}
    </View>
  )
}

export default MindMapHalamanList