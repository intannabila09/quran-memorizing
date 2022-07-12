import { Text, TouchableOpacity, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    primary_button_container: {
        backgroundColor: '#2E2E2E',
        color: '#FFFFFF',
        padding: 16,
        width: '100%',
        borderRadius: 12,
    },
    title: {
        color: '#FFFFFF',
        textAlign: 'center',
    }
})

const PrimaryButton = ({ title = 'Primary Button', onPress = () => {}, style}) => {
    return (
        <TouchableOpacity style={{...styles.primary_button_container, ...style}} onPress={onPress}>
            {
                typeof title === 'string' && (
                    <Text style={styles.title}>{title}</Text>
                )
            }
            {
                typeof title !== 'string' && title
            }
        </TouchableOpacity>
    )
}

export default PrimaryButton;