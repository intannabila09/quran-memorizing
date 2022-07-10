import { TouchableOpacity, View, Text, Image } from 'react-native'
import { FontAwesome5, FontAwesome, Entypo } from '@expo/vector-icons';
import tikrarPlus from 'assets/tikrarPlus.png'

const MushafMenuBar = () => {
    return (
        <View
            style={{
                width: '100%',
                height: 85,
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                bottom: 13,
                paddingHorizontal: 20,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}>
                        <FontAwesome name="play" size={24} color="#A0A0A0" />
                        {/* <Text style={{ fontSize: 12, marginTop: 4, color: '#A0A0A0'}}>
                            Setting Audio
                        </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}>
                        <FontAwesome name="cog" size={24} color="#A0A0A0" />
                        {/* <Text style={{ fontSize: 12, marginTop: 4, color: '#A0A0A0'}}>
                            Setting Audio
                        </Text> */}
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#1DC25D',
                        paddingLeft: 13,
                        paddingRight: 11,
                        paddingVertical: 12,
                        borderRadius: 999,
                        textAlign: 'center',
                    }}
                >
                    <Image source={tikrarPlus} style={{ width: 35, height: 32}}/>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}>
                        <FontAwesome5 name="globe-asia" size={24} color="#A0A0A0" />
                        {/* <Text style={{ fontSize: 12, marginTop: 4, color: '#A0A0A0'}}>
                            Terjemah
                        </Text> */}
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 0, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 20}}>
                        <FontAwesome name="eye" size={24} color="#A0A0A0" />
                        {/* <Text style={{ fontSize: 12, marginTop: 4, color: '#A0A0A0'}}>
                             Tampilan Ayat
                        </Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default MushafMenuBar;