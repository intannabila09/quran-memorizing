import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import PrimaryButton from 'components/Buttons/PrimaryButton'
import { Fontisto } from '@expo/vector-icons';
import MemorizationHistory from 'components/Homepage/MemorizationHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            {/* DELETE IN PRODUCTION */}
            <View style={{ marginTop: 16}}>
                <TouchableOpacity
                    style={{
                        padding: 12,
                        borderRadius: 8,
                        backgroundColor: 'red',
                    }}
                    onPress={async () => {
                        try {
                            await AsyncStorage.clear()
                        } catch(e) {
                            console.log(e)
                        }
                        console.log('cleared')
                    }}
                >
                    <Text style={{
                        color: '#FFFFFF',
                        textAlign: 'center',
                        fontWeight: "500"
                    }}>Delete Storage</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LowerSection;