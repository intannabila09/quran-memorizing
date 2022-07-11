import { useState } from "react"
import { View, SafeAreaView, StyleSheet, Text, ScrollView, ImageBackground, Dimensions, FlatList, Touchable, Pressable } from "react-native"
import PageMapper from "assets/mushaf/pages/PageMapper"

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '100%'
    },
    page: {
        width: width,
        backgroundColor: '#FFFFFF',
        height: '99%',
    }
})

const QuranPages = ({ showMenu, setShowMenu}) => {
    const [pages,setPages] = useState(Array.from({ length: 23 }, (_, i) => i + 1))
    return (
        <SafeAreaView>
            <View
                style={styles.container}
            >
                <FlatList
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
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