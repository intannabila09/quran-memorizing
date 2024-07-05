import { View, Text } from 'react-native'
import React, { useMemo } from 'react'

const AyahPerMap = ({mmId, ayahList, level}) => {
  const ayah = useMemo(() => {
    const ayahs = []
    const ayahNum = []

    if (level === 'parent') ayahs.push(ayahList.filter(item => item.mmParentId === mmId))
    else ayahs.push(ayahList.filter(item => item.mmChildrenId === mmId))

    ayahs.map((item) => {
      item.map((i) => {
        ayahNum.push(i.number)
      })
    })

    return ayahNum.length>1? (`${ayahNum[0]}-${ayahNum[ayahNum.length-1]}`) : (ayahNum[0])
    })

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 13, fontWeight: '500', color: 'white' }} >
        {ayah}        
      </Text>
    </View>
  )
}

export default AyahPerMap