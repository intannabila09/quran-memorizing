import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons, Foundation } from '@expo/vector-icons'


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        height: '100%'
    }
})

const Setting = ({ navigation }) => {
    return (
        <>
            <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 48}} />
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
                    <View style={{
                        paddingTop: 12
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '600'}}>
                            Tentang Aplikasi Menghafal Alquran
                        </Text>
                        <Text style={{ marginTop: 8, fontSize: 12, lineHeight: 20, textAlign: 'justify' }}>
                            Aplikasi menghafal Al-Quran ini diinisiasi oleh dosen Jurusan Informatika dan dosen Fakultas Ilmu Agama Islam (FIAI) Universitas Islam Indonesia. Tim pelaksana program adalah dua programmer dari mahasiswa program studi Informatika. Program ini merupakan hibah penelitian unggulan Direktorat Penelitian dan Pengabdian Masyarakat UII tahun 2022. Aplikasi ini akan didedikasikan ke masyarakat melalui komunitas Pusat Kontribusi Teknologi Islami (Contribution Center of Islamic Technology).
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginTop: 12}}>
                            Versi Aplikasi
                        </Text>
                        <View style={{ marginTop: 12 }}>
                            <Text>1.01</Text>
                            <Text style={{ fontSize: 12, marginTop: 8, lineHeight: 20}}>
                                Minimum Viable Product dengan fitur:{'\n'}
                                1. Mushaf Juz 30 dengan layout Alquran standar Indonesia{'\n'}
                                2. Fitur pencatatan progress hafalan{'\n'}
                                3. Fitur pengaturan mode tikrar dan tutup ayat{'\n'}
                                4. Fitur audio dan mode perulangan{'\n'}
                                5. Terjemah ayat{'\n'}
                                6. Fitur pencarian ayat{'\n'}
                                7. Fitur pencarian surat{'\n'}
                                8. Fitur pencarian juz{'\n'}
                                9. Riwayat Hafalan{'\n'}
                                10. Catatan pada ayat{'\n'}
                            </Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Setting;