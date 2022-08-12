import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native"
import { SurahItems } from "utils/constants";
import { useMushafState } from "context/MushafContext";

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    }
})

const AyahMenuContent = () => {
    const {mushafState} = useMushafState()
    const { selectedAyah } = mushafState
    const [activeAyah,setActiveAyah] = useState({ surahNumber: 0, surahName: "", ayah: "" })
    
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
                    borderBottomColor: '#ededed',
                    borderBottomWidth: 1,
                    padding: 16,
                    paddingBottom: 20,
                }}
            >
                <Text style={{ fontSize: 18, fontWeight: "700"}}>{`${activeAyah['surahNumber']}. ${activeAyah['surahName']} : ${activeAyah['ayah']}`}</Text>
            </View>
        </View>
    )
}

export default AyahMenuContent;