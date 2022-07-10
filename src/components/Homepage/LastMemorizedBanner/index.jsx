import { View, Text, TouchableOpacity, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Quran from 'assets/Quran.png'

const LastMemorizedBanner = ({
    style,
    navigation
}) => {
    return (
        <LinearGradient
            colors={['#1FD365', '#00B145']}
            style={{
                ...style,
                paddingHorizontal: 16,
                paddingVertical: 20,
                borderRadius: 8,
                marginTop: 16,
                position: 'relative'
            }}
            start={{
                x: 1,
                y: 0,
            }}
            end={{
                x: 1,
                y: 1,
            }}
        >
            <View style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 1, elevation: 1}}>
                <Image source={Quran} />
            </View>
            <View style={{ position: 'relative', zIndex: 2, elevation: 2}}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="bookmark" size={12} color="#FFFFFF" style={{ opacity: 0.75}} />
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '500', marginLeft: 4, opacity: 0.9 }}>Terakhir Dihafalkan</Text>
                </View>
                <View style={{ marginTop: 8 }}>
                    <Text style={{ fontSize: 28, color: '#FFFFFF', fontWeight: '600' }}>
                        Al-Fatihah
                    </Text>
                    <Text style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)' }}>
                        Ayat 1
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 32,
                        paddingVertical: 8,
                        borderWidth: 1,
                        borderRadius: 999,
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(0, 190, 74, 0.3)',
                    }}
                    onPress={() => navigation.navigate('Mushaf')}
                >
                    <Text style={{ color: '#FFFFFF', fontWeight: '600', marginRight: 4}}>
                        Buka
                    </Text>
                    <FontAwesome name="angle-right" size={14} color="#FFFFFF" style={{ marginTop: 1}} />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default LastMemorizedBanner;