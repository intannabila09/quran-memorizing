import { View, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const MemorizationHistoryItem = ({
    surah,
    ayah,
    memorizedAt,
    style,
}) => {
    return (
        <TouchableOpacity
            style={{
                ...style,
                paddingHorizontal: 16,
                paddingVertical: 12,
                borderRadius: 12,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E6E6E6',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name="checkmark-circle-sharp" size={16} color="#13A355" />
                <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontSize:16, fontWeight:'600' }}>
                        {surah}
                    </Text>
                    <Text style={{ fontSize: 12, marginTop: 4, color: '#777777'}}>
                        {memorizedAt}
                    </Text>
                </View>
            </View>
            <Text style={{ color: '#777777'}}>
                Ayat {ayah}
            </Text>
        </TouchableOpacity>
    )
}

export default MemorizationHistoryItem;