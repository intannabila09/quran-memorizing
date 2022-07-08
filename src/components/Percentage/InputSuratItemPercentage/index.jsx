import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

const InputSuratItemPercentage = ({
    memorized = 0,
    total = 0,
}) => {
    return (
        <View style={{ marginTop: 12 }}>
            <View style={{ height: 4, width: '100%', backgroundColor: '#EAEAEA', borderRadius: '999px'}}>
                <View
                    style={{ height: '100%', width: `${(memorized/total)*100}%`, borderRadius: '999px'}}
                >
                    <LinearGradient
                        colors={['#26E065', '#13A355']}
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: '999px'
                        }}
                        end={{
                            x: 1,
                            y: 1,
                        }}
                    />
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', 
                marginTop: 8   
            }}>
                <Text style={{ fontSize: 12 }}>{memorized}/{total}</Text>
                <Text style={{ fontSize: 12}}>{Math.floor((memorized/total) * 100)}%</Text>
            </View>
        </View>
    )
}

export default InputSuratItemPercentage;