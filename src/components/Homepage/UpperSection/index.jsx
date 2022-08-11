import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import AccentPattern from "assets/accent-pattern.png"

import HomepagePrimaryPercentage from 'components/Percentage/HomepagePrimaryPercentage';
import HomepageSecondaryPercentage from 'components/Percentage/HomepageSecondaryPercentage';

import LastMemorizedBanner from 'components/Homepage/LastMemorizedBanner';
import { useOnBoardingState } from '../../../context/OnBoardingContext';

const styles = StyleSheet.create({
    container: {
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
    }
})

const UpperSection = ({ navigation }) => {
    const { onBoardingState } = useOnBoardingState()
    // console.log(onBoardingState)
    return (
        <View style={styles.container}>
            <View style={{ position: 'absolute', top: 0, right: 0}}>
                <Image source={AccentPattern} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{ fontSize: 14, fontWeight: '500', color: '#939393'}}>Pencapaian Hafalan</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <Ionicons name="settings" size={20} color="#CCCCCC" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 24}}>
                        <FontAwesome name="file-text" size={20} color="#CCCCCC" />
                    </TouchableOpacity>
                </View>
            </View>
            <HomepagePrimaryPercentage
                style={{ marginTop: 16 }}
                surah={'An-Nas'}
                memorized={3}
                total={6}
            />
            <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                <HomepageSecondaryPercentage
                    memorized={255}
                    total={564}
                    juz={30}
                    style={{ flexGrow: 1 }}
                />
                <View style={{  paddingLeft: 16, borderLeftWidth: 1, borderLeftColor: '#EEEDED', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600'}}>
                        18%
                    </Text>
                    <Text style={{ fontWeight: '500', fontSize: 12, marginTop: 4 }}>
                        dari Alquran
                    </Text>
                </View>
            </View>
            {
                onBoardingState?.initialUsage && (
                    <View style={{
                        marginTop: 20,
                        padding: 16,
                        borderWidth: 1,
                        borderColor: '#dbeafe',
                        backgroundColor: '#eff6ff',
                        borderRadius: 8
                    }}>
                        <View style={{ flexDirection: 'row'}}>
                            <FontAwesome5 name="info-circle" size={16} color="#1e3a8a" />
                            <Text
                                style={{
                                    marginLeft: 4,
                                    fontSize: 18,
                                    fontWeight: '600',
                                    color: '#1e3a8a',
                                }}
                            >
                                Sudah Memiliki Hafalan?
                            </Text>
                        </View>
                        <Text style={{ marginTop: 4, fontSize: 14, color: '#1e40af', lineHeight: 20}}>
                            Kamu dapat memasukkan progress hafalanmu ke dalam aplikasi ini dan memilih gaya menghafal yang kamu suka
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 8, justifyContent: 'space-between'}}>
                            <TouchableOpacity
                                style={{
                                    width: '49%',
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderRadius: 6,
                                    backgroundColor: '#dbeafe'
                                }}
                            >
                                <Text style={{ textAlign: 'center', color: '#1e3a8a', fontWeight: '500'}}>Abaikan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    width: '49%',
                                    paddingHorizontal: 8,
                                    paddingVertical: 10,
                                    borderWidth: 1,
                                    borderRadius: 6,
                                    justifyContent: 'center',
                                    borderColor: '#1d4ed8',
                                    backgroundColor: '#1e40af'
                                }}
                                onPress={() => navigation.navigate('InputMemorization')}
                            >
                                <Text style={{textAlign: 'center', color: '#eff6ff', fontWeight: '500' }}>Masukkan Hafalan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
            <View style={{ marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 12,
                        backgroundColor: '#FFFFFF',
                        borderWidth: 1,
                        borderColor: '#E4E4E4',
                        borderRadius: 8,
                    }}
                    onPress={() => navigation.navigate('MemorizationProgress')}
                >
                    <Text
                        style={{
                            marginRight: 8,
                            color: '#484848',
                            fontWeight: '500'
                        }}
                    >
                        Lihat seluruh progress hafalan
                    </Text>
                    <FontAwesome name="angle-right" size={14} color="#484848" />
                </TouchableOpacity>
            </View>
            <View>
                <LastMemorizedBanner navigation={navigation} />
            </View>
        </View>
    )
}

export default UpperSection;