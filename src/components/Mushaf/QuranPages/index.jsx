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
import ContentMapper from "assets/mushaf/ContentMapper"
import { useMushafState } from "context/MushafContext"
import RenderPage from "./RenderPage"

const { width } = Dimensions.get('window')

const QuranPages = ({ showMenu, setShowMenu}) => {
    const [activeJuz,setActiveJuz] = useState(30)
    const [pages] = useState(['23','22','21','20'])
    const [activePage,setActivePage] = useState(null)
    const [content,setContent] = useState(null)
    const [_,setCurrentContent] = useState(null)
    const flatListRef = useRef(null)

    const {mushafState} = useMushafState()
    const {visibilityMode} = mushafState

    // START – DEVELOPMENT VARIABLES
    // const [firstWordCovers,setFirstWordCovers] = useState({})
    // const [invisibleCovers,setInvisibleCovers] = useState({})
    // END – DEVELOPMENT VARIABLES

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
            setCurrentContent(ContentMapper()[activeJuz].pages[activePage].content)
        }
    },[activePage])

    useEffect(() => {
        if (activeJuz) {
            setContent(ContentMapper()[activeJuz].pages)
        }
    },[activeJuz])

    useEffect(() => {
        setTimeout(() => {
            setShowMenu(!showMenu)
        },1000)
    },[])

    // START – DEVELOPMENT VARIABLES
    // useEffect(() => {
    //     if (currentContent) {
            //     const newFirstWordCovers =
            //     currentContent
            //         .map((ayah) => {
            //             return ayah.covers["firstWord"]
            //         })
            //         .reduce((acc,cur) => {
            //             return [...acc, ...cur]
            //         },[])
            // setFirstWordCovers(newFirstWordCovers)
            // const newInvisibleCovers =
            //     currentContent
            //         .map((ayah) => {
            //             return ayah.covers["invisible"]
            //         })
            //         .reduce((acc,cur) => {
            //             return [...acc, ...cur]
            //         },[])
            // setInvisibleCovers(newInvisibleCovers)
        // }
    // },[currentContent])
    // END – DEVELOPMENT VARIABLES

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
                renderItem={(page) => {
                    if (!content) return <></>
                    return (
                        <RenderPage
                            page={page}
                            showMenu={{
                                value: showMenu,
                                setValue: setShowMenu,
                            }}
                            source={content[page.item]?.image ?? null}
                            activeAyah={activeAyah}
                            ayahPositions={
                                content[page.item]?.content
                                .map((ayah) => {
                                    return ayah.coord
                                })
                                .reduce((acc,cur) => {
                                    return [...acc, ...cur]
                                },[])
                            }
                            versePress={versePress}
                            verseLongPress={verseLongPress}
                            covers={
                                content[page.item]?.content
                                .map((ayah) => {
                                    return ayah.covers[visibilityMode] ?? []
                                })
                                .reduce((acc,cur) => {
                                    return [...acc, ...cur]
                                },[])
                            }
                            activePage={activePage}
                            // START – DEVELOPMENT VARIABLES
                            // invisibleCovers={invisibleCovers}
                            // firstWordCovers={firstWordCovers}
                            // END – DEVELOPMENT VARIABLES
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default QuranPages;