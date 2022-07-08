import { View, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: '12px',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

const JuzInputListItem = ({ juz, checked = true }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: '#000000', fontSize: 20}}>{juz.item.label}</Text>
            <Checkbox
                style={{
                    width: 16,
                    height: 16,
                    borderColor: '#AEAEAE',
                    borderWidth: 1,
                    borderRadius: 4,
                }}
                value={checked}
                color={checked ? '#1DC25D' : null}
            />
        </View>
    )
}

export default JuzInputListItem;