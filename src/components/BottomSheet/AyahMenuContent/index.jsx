import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native"
import { SurahItems } from "utils/constants";
import { useMushafState } from "context/MushafContext";
import AyahMenuButton from "components/Buttons/AyahMenuButton";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})

const AYAH_MENU_ITEMS = (memorized) => [
    {
        key: 'memorize',
        label: `${memorized ? 'Tandai Belum Hafal' : 'Tandai Sudah Hafal'}`,
        icon: !memorized ? <FontAwesome name="check-square-o" size={16} color="black" /> : <FontAwesome name="times-circle-o" size={16} color="black" />
    },
    {
        key: 'copy',
        label: 'Salin Ayat',
        icon: <FontAwesome5 name="copy" size={16} color="black" />,
    },
    {
        key: 'note',
        label: 'Tambahkan Catatan',
        icon: <FontAwesome name="pencil-square-o" size={16} color="black" />
    },
    {
        key: 'play',
        label: 'Putar Audio',
        icon: <FontAwesome5 name="play" size={16} color="black" />
    }
]

const AyahMenuContent = () => {
    const {mushafState} = useMushafState()
    const { selectedAyah } = mushafState
    const [activeAyah,setActiveAyah] = useState({ surahNumber: 0, surahName: "", ayah: "" })
    const [memorized,setMemorized] = useState(false)
    
    useEffect(() => {
        if (selectedAyah) {
            const [surahIndex,ayahNumber] = selectedAyah.split(":")
            setActiveAyah({ surahNumber: SurahItems[surahIndex-1].no, surahName: SurahItems[surahIndex-1].name, ayah: ayahNumber })
        }
    },[selectedAyah])

    console.log(activeAyah)

    return (
        <View style={styles.container}>
            <View
                style={{
                    paddingVertical: 16,
                    paddingHorizontal: 8,
                    paddingBottom: 20,
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "700"}}>{`${activeAyah['surahNumber']}. ${activeAyah['surahName']}: ${activeAyah['ayah']}`}</Text>
                <View
                    style={{
                        borderWidth: 1,
                        paddingVertical: 4,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        borderColor: memorized ? "#86efac" : "#e2e8f0",
                        backgroundColor: memorized ? "#dcfce7" : "#f1f5f9",
                    }}
                >
                    <Text style={{ fontWeight: "700", fontSize: 14, color: memorized ? "#16a34a" : "#475569"}}>
                        {memorized ? 'Sudah Hafal' : 'Belum Hafal'}
                    </Text>
                </View>
            </View>
            <View>
                {AYAH_MENU_ITEMS(memorized).map(item => {
                    return (
                        <AyahMenuButton menu={item} key={item.key} />
                    )
                })}
            </View>
        </View>
    )
}

export default AyahMenuContent;