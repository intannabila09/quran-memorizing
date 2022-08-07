import { useRef, useState, useEffect } from "react"
import { View, SafeAreaView, StyleSheet, Text, ScrollView, ImageBackground, Dimensions, FlatList, Pressable, TouchableOpacity } from "react-native"
import PageMapper from "assets/mushaf/pages/PageMapper"
import { PAGES_CONTENT } from "utils/pagesContent"
import VerseButton from "components/Buttons/VerseButton"

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    page: {
        width: width,
        backgroundColor: '#f8f5e9',
        position: 'relative',
    }
})

const QuranPages = ({ showMenu, setShowMenu}) => {
    const [pages,setPages] = useState(['603','602','601','600'])
    const [activePage,setActivePage] = useState(null)
    const [currentContent,setCurrentContent] = useState(null)
    const flatListRef = useRef(null)
    const [ayahPositions,setAyahPositions] = useState([])

    // Active Ayah
    const [activeAyah,setActiveAyah] = useState(null)

    const viewConfigRef = useRef(({viewAreaCoveragePercentThreshold: 50}))
    const onViewChanged = useRef(({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActivePage(viewableItems[0].item)
        }
    })

    useEffect(() => {
        if (activePage) {
            setActiveAyah(null)
            setCurrentContent(PAGES_CONTENT[activePage])
            const newAyahPositions =
            PAGES_CONTENT[activePage]
                .map((ayah) => {
                    return ayah.coord
                })
                .reduce((acc,cur) => {
                    return [...acc, ...cur]
                },[])
            setAyahPositions(newAyahPositions)
        }
    },[activePage])

    const verseLongPress = (ayah) => {
        setActiveAyah(ayah)
        console.log('long press', ayah)
    }

    const versePress = () => {
        setActiveAyah(null)
        setShowMenu(!showMenu)
        console.log('press')
    }

    return (
        <SafeAreaView>
            <FlatList
                ref={flatListRef}
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewChanged.current}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                pagingEnabled={true}
                snapToInterval={width}
                snapToAlignment={"center"}
                decelerationRate={0}
                data={pages}
                keyExtractor={(item) => item.toString()}
                renderItem={((page) => {
                    return (
                        <Pressable onPress={() => {
                            setShowMenu(!showMenu)
                            setActiveAyah(null)
                        }}>
                            <View
                                style={styles.page}
                            >
                                <ImageBackground
                                    source={PageMapper()[0].pages[23-page.index]}
                                    style={{
                                        position: 'relative',
                                        aspectRatio: 0.506,
                                    }}
                                    resizeMode="contain"
                                >
                                    {
                                        ayahPositions.length > 0
                                        && ayahPositions.map((item,idx) => {
                                            const ayah = `{item.key.split(':')[0]}:${item.key.split(':')[1]}}`
                                            return (
                                                <VerseButton
                                                    index={idx}
                                                    key={item.key}
                                                    height={item.height}
                                                    width={item.width}
                                                    top={item.top}
                                                    right={item.right}
                                                    onPress={versePress}
                                                    onLongPress={verseLongPress}
                                                    ayah={ayah}
                                                    active={activeAyah === ayah}
                                                />
                                            )
                                        })
                                    }
                                </ImageBackground>
                            </View>
                        </Pressable>
                    )
                })
                }
            />
        </SafeAreaView>
    )
}

export default QuranPages;