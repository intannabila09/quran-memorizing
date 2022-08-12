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
    // Used to chech if current page is displayed on screen
    page = {},
    activePage = null,
    // START – DEVELOPMENT VARIABLES
    firstWordCovers = [],
    invisibleCovers = [],
    // END – DEVELOPMENT VARIABLES
}) => {
    return (
        <Pressable onPress={() => {
            setActiveAyah(null)
            showMenu.setValue(!showMenu.value)
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
                    <AyahCovers
                        covers={covers}
                        // START – DEVELOPMENT VARIABLES
                        firstWords={firstWordCovers}
                        invisibles={invisibleCovers}
                        // END – DEVELOPMENT VARIABLES
                    />
                </ImageBackground>
            </View>
        </Pressable>
    )
}

export default RenderPage;