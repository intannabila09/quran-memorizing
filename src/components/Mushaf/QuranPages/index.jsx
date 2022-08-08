import {
    useRef,
    useState,
    useEffect
} from "react"
import {
    SafeAreaView,
    Dimensions,
    FlatList
} from "react-native"
import PageMapper from "assets/mushaf/pages/PageMapper"
import { PAGES_CONTENT } from "utils/pagesContent"
import { useMushafState } from "context/MushafContext"
import RenderPage from "./RenderPage"

const { width } = Dimensions.get('window')

const QuranPages = ({ showMenu, setShowMenu}) => {
    const [pages] = useState(['603','602','601','600'])
    const [activePage,setActivePage] = useState(null)
    const [_,setCurrentContent] = useState(null)
    const flatListRef = useRef(null)

    const [ayahPositions,setAyahPositions] = useState([])
    const [covers,setCovers] = useState([])

    const {mushafState} = useMushafState()
    const {visibilityMode} = mushafState

    // Active Ayah
    const [activeAyah,setActiveAyah] = useState(null)

    const viewConfigRef = useRef(({viewAreaCoveragePercentThreshold: 50}))
    const onViewChanged = useRef(({viewableItems}) => {
        if (viewableItems.length > 0) {
            setActivePage(viewableItems[0].item)
        }
    })

    const verseLongPress = (ayah) => {
        setActiveAyah(ayah)
        console.log('long press', ayah)
    }

    const versePress = () => {
        setActiveAyah(null)
        setShowMenu(!showMenu)
        console.log('press')
    }

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

    useEffect(() => {
        if (
            !visibilityMode
            || visibilityMode === 'all'
        ) return setCovers([])
        const newCovers = 
            PAGES_CONTENT[activePage]
                .map((ayah) => {
                    return ayah.covers[visibilityMode]
                })
                .reduce((acc,cur) => {
                    return [...acc, ...cur]
                },[])
        setCovers(newCovers)
    },[visibilityMode])

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
                renderItem={(page) => (
                    <RenderPage
                        showMenu={{
                            value: showMenu,
                            setValue: setShowMenu,
                        }}
                        source={PageMapper()[0].pages[23-page.index]}
                        activeAyah={activeAyah}
                        ayahPositions={ayahPositions}
                        versePress={versePress}
                        verseLongPress={verseLongPress}
                        covers={covers}
                        activePage={activePage}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default QuranPages;