import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons, Foundation } from '@expo/vector-icons'


const styles = StyleSheet.create({
    container: {
        padding: 20,
    }
})

const Setting = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 4}} onPress={() => navigation.navigate('Homepage')}>
                    <Ionicons name="chevron-back-sharp" size={16} color="#969696" />
                    <Text style={{ fontSize: 16, marginLeft: 8, color: '#969696' }}>Halaman Utama</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 12 }}>
                    Pengaturan
                </Text>
                <View style={{ marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#e1e1e1', paddingBottom: 16 }}>
                    <Text
                        style={{
                            marginBottom: 8
                        }}
                    >
                        Personalisasi Aplikasi
                    </Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 12,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#e2e2e2',
                            marginBottom: 8,
                        }}
                        onPress={() => {
                            navigation.navigate('InputMemorization')
                        }}
                    >
                        <View style={{ width: 16, alignItems: 'center'}}>
                            <Foundation name="clipboard-notes" size={16} color="#8a8a8a" />
                        </View>
                        <Text style={{ marginLeft: 8, fontWeight: '500'}}>
                            Masukkan Progress Hafalan
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 12,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: '#e2e2e2'
                        }}
                        onPress={() => navigation.navigate('PersonalizationConfig')}
                    >
                        <Ionicons name="timer-outline" size={16} color="#8a8a8a" />
                        <Text style={{ marginLeft: 8, fontWeight: '500'}}>
                            Mode Tikrar &amp; Tutup Ayat
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Setting;