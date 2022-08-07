import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
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
    console.log(onBoardingState)
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