import { useState, useEffect } from 'react'
import { View, Platform, StyleSheet, Text, TouchableOpacity, BackHandler } from "react-native"
import { useMushafState } from "context/MushafContext"
import { FontAwesome } from '@expo/vector-icons';
import ContentMapper from "assets/mushaf/ContentMapper"
import { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import MindMapSurahList from '../MindMap/Surah';
import MindMapHalamanList from '../MindMap/Halaman';

const { OS: os } = Platform

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})

const Tabs = [
    {
        label: 'Halaman',
        value: 'halaman',
    },
    {
        label: 'Surah',
        value: 'surah',
    }
]

const TranslationModalContent = ({
    forwardedRef,
    activeMapAyah,
    activeMapStatus,
    setActiveMapStatus,
    handleSetActiveMap = () => {},
    ...props
}) => {
    const {
        mushafState
    } = useMushafState()
    const { content: activeContent } = mushafState
    const { juz, verses } = activeContent

    const [content, setContent] = useState(null)
    const [viewMindMap, setViewMindMap] = useState(false)
    const [activeTab, setActiveTab] = useState(Tabs[0].value)
    const listAyah = [];
    
    useEffect(() => {
        if (juz) {
        const availableSurah = Object.keys(verses).map((key) => Number(key))
        setContent(
            ContentMapper()[juz].metadata
            .filter((item) => {
                return availableSurah.includes(item.number)
            })
            .reduce((acc,cur) => {
                acc[cur.number] = cur
                return acc
            },{})
        )
        
        }
    },[activeContent])

    useEffect(() => {
        const backAction = () => {
            forwardedRef.current.close()
            return true
        }
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        )
        return () => backHandler.remove()
    },[])

    return (
        <View style={styles.container}>
            <BottomSheetView
                style={{
                    paddingVertical: 16,
                    paddingBottom: os === 'ios' ? 20 : 12,
                    flexDirection: "row",
                    alignItems: os === 'ios' ? 'center' : 'flex-start',
                    justifyContent: 'space-between',
                }}
            >
                <View>
                    <Text style={{ fontSize: 18, fontWeight: "700", paddingVertical: 4 }}>Terjemah</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 5 }}>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 4,
                            borderRadius: 10,
                            backgroundColor: viewMindMap ? '#1DC25D' : '#FFFFFF',
                            borderWidth: 1,
                            borderColor: viewMindMap ? '#FFFFFF' : '#1DC25D',
                            marginRight: 5,
                            width: 100,
                            justifyContent: 'center'
                        }}
                        onPress={() => setViewMindMap(viewMindMap? false : true)}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '600',
                                color: viewMindMap ? '#FFFFFF' : '#1DC25D',
                                textAlign: 'center'
                            }}
                        >
                            Mind Map
                        </Text>
                    </TouchableOpacity>
                    {
                        os === 'android' && (
                            <TouchableOpacity
                                onPress={() => {
                                    forwardedRef.current.close()
                                }}
                                style={{ paddingHorizontal: 8, paddingVertical: 4, marginRight: -8 }}
                            >
                                <FontAwesome name="times-circle" size={24} color="black" />
                            </TouchableOpacity>
                        )
                    }
                </View>
            </BottomSheetView>

            {!viewMindMap &&
            <View style={{ height: '85%', paddingBottom: 20 }}>
                <BottomSheetScrollView>
                    {
                        content && Object.keys(content).map((key) => {
                            return (
                                <View
                                    key={key}
                                    style={{
                                        marginBottom: 0,
                                    }}
                                >
                                    <View
                                        style={{
                                            padding: 12,
                                            borderWidth: 1,
                                            borderColor: '#e2e8f0',
                                            flexDirection: "row",
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            backgroundColor: '#f8fafc',
                                            borderRadius: 4,
                                        }}
                                    >
                                        <Text style={{ textAlign: 'center', fontWeight: '600', marginHorizontal: 8 }}>{content[key].name.id}</Text>
                                        <Text style={{ textAlign: 'center', marginHorizontal: 8, fontSize: 12 }}>{content[key].name.translation}</Text>
                                    </View>
                                    <View style={{ padding: 8}}>
                                        {
                                            verses[key] && verses[key].map((item) => {
                                                const ayah = content[key].ayah.find((ayah) => String(ayah.number) === String(item))
                                                return (
                                                    <View style={{ flexDirection: 'row', marginBottom: 8 }} key={ayah.id}>
                                                        <Text style={{ marginRight: 8, fontWeight: '600'}}>{ayah.number}.</Text>
                                                        <Text style={{ paddingRight: 15 }}>
                                                            {ayah.translation}
                                                        </Text>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            )
                        })
                    }
                </BottomSheetScrollView>
            </View>
            }

            {/* MIND MAP */}
            {viewMindMap &&
            <View style={{ height: '85%', paddingBottom: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row'}}>
                        {Tabs.map(tab => (
                            <TouchableOpacity
                                key={tab.value}
                                style={{
                                    paddingHorizontal: 20,
                                    paddingBottom: 8,
                                    paddingTop: 4,
                                    // borderRadius: 999,
                                    borderBottomWidth: 3,
                                    // backgroundColor: activeTab === tab.value ? '#1DC25D' : '#FFFFFF',
                                    // borderWidth: 1,
                                    borderColor: activeTab === tab.value ? '#A9DDBE' : '#F1F1F1',
                                    marginRight: 8,
                                    width: 100,
                                }}
                                onPress={() => setActiveTab(tab.value)}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: activeTab === tab.value ? '#1DC25D' : '#8A8A8A',
                                        textAlign: 'center'
                                    }}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <View style={{ height: 1, marginTop: 5 }}></View>
            
                <BottomSheetScrollView>
                    { content && Object.keys(content).map((key) => {
                        return (
                            <View key={key} style={{ marginBottom: 0 }}>
                                {/* nama dan arti surat */}
                                <View
                                    style={{
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#e2e8f0',
                                        flexDirection: "row",
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        backgroundColor: '#ECECEC',
                                        borderRadius: 4,
                                        marginTop: 15,
                                        marginBottom: 10
                                    }}
                                >
                                    <Text style={{ textAlign: 'center', fontWeight: '600', marginHorizontal: 8 }}>{content[key].name.id}</Text>
                                    <Text style={{ textAlign: 'center', marginHorizontal: 8, fontSize: 12, fontStyle: 'italic' }}>{content[key].name.translation}</Text>
                                </View>

                                {
                                    verses[key] && verses[key].map((item) => {
                                        const ayah = content[key].ayah.find((ayah) => String(ayah.number) === String(item))
                                        listAyah.push(ayah)
                                    })
                                }
                                
                                { activeTab === 'surah' && <MindMapSurahList item={content[key]} /> }
                                
                                { activeTab === 'halaman' && 
                                    <MindMapHalamanList 
                                        item={content[key]} 
                                        listAyah={listAyah} 
                                        surahId={content[key].name.id} 
                                        surahNumber={content[key].number} 
                                        activeMapAyah={activeMapAyah}
                                        handleSetActiveMap={handleSetActiveMap} 
                                        activeMapStatus={activeMapStatus}
                                        setActiveMapStatus={setActiveMapStatus}
                                    />
                                }

                            </View>
                        )
                    })}
  
                </BottomSheetScrollView>
            </View>
            }
        </View>
    )
}

export default TranslationModalContent