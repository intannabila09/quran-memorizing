import { useRef, useState, useEffect } from "react"
import { View, SafeAreaView, StyleSheet, Text, ScrollView, ImageBackground, Dimensions, FlatList, Touchable, Pressable } from "react-native"
import PageMapper from "assets/mushaf/pages/PageMapper"
import { PAGES_CONTENT } from "utils/pagesContent"

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f5e9',
        width: '100%',
        height: '98%'
    },
    page: {
        width: width,
        backgroundColor: '#f8f5e9',
        height: '99%',
    }
})

const QuranPages = ({ showMenu, setShowMenu}) => {
    const [pages,setPages] = useState(['603','602','601','600'])
    const [activePage,setActivePage] = useState(null)
    const [currentContent,setCurrentContent] = useState(null)
    const flatListRef = useRef(null)

    console.log(currentContent)

    const viewConfigRef = useRef(({viewAreaCoveragePercentThreshold: 50}))
    const onViewChanged = useRef(({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActivePage(viewableItems[0].item)
        }
    })

    useEffect(() => {
        if (activePage) {
            setCurrentContent(PAGES_CONTENT[activePage])
        }
    },[activePage])

    return (
        <SafeAreaView>
            <View
                style={styles.container}
            >
                <FlatList
                    ref={flatListRef}
                    viewabilityConfig={viewConfigRef.current}
                    onViewableItemsChanged={onViewChanged.current}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
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
                            <Pressable onPress={() => setShowMenu(!showMenu)}>
                                <View style={styles.page}>
                                    <ImageBackground
                                        source={PageMapper()[0].pages[23-page.index]}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        resizeMode="contain"
                                    >
                                    </ImageBackground>
                                </View>
                            </Pressable>
                        )
                    })
                }
                />
            </View>
        </SafeAreaView>
    )
}

export default QuranPages;