import {
    View,
    Pressable,
    ImageBackground,
    StyleSheet,
    Dimensions
} from 'react-native'
import AyahCovers from '../Covers'
import TouchHandler from '../TouchHandler'

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    page: {
        width: width,
        backgroundColor: '#f8f5e9',
        position: 'relative',
    }
})

const RenderPage = ({
    showMenu = {
        value: false,
        setValue: () => {},
    },
    source = null,
    activeAyah = null,
    ayahPositions = [],
    versePress = () => {},
    verseLongPress = () => {},
    covers = [],
    setActiveAyah = () => {},
}) => {
    return (
        <Pressable onPress={() => {
            showMenu.setValue(!showMenu.value)
            setActiveAyah(null)
        }}>
            <View
                style={styles.page}
            >
                <ImageBackground
                    source={source}
                    style={{
                        position: 'relative',
                        aspectRatio: 0.506,
                    }}
                    resizeMode="contain"
                >
                    {/* Touch Handler Layer */}
                    <TouchHandler
                        activeAyah={activeAyah}
                        ayahPositions={ayahPositions}
                        versePress={versePress}
                        verseLongPress={verseLongPress}
                    />
                    {/* Covers Layer */}
                    <AyahCovers covers={covers} />
                </ImageBackground>
            </View>
        </Pressable>
    )
}

export default RenderPage;