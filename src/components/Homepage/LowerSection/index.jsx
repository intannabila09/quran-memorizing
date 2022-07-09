import { View, StyleSheet, Text } from 'react-native'
import PrimaryButton from 'components/Buttons/PrimaryButton'
import { Fontisto } from '@expo/vector-icons';
import MemorizationHistory from 'components/Homepage/MemorizationHistory';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1',
        paddingHorizontal: 20,
        paddingVertical: 24,
    }
})

const LowerSection = () => {
    return (
        <View style={styles.container}>
            <PrimaryButton
                title={(() => {
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                            <Fontisto name="search" size={12} color="#FFFFFF" style={{ marginTop: 2}} />
                            <Text style={{ color: '#FFFFFF', marginLeft: 8, fontWeight: '600'}}>Cari Surat atau Ayat</Text>
                        </View>
                    )
                })()}
            />
            <MemorizationHistory />
        </View>
    )
}

export default LowerSection;