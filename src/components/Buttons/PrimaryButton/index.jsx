import { Text, TouchableOpacity, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    primary_button_container: {
        backgroundColor: '#2E2E2E',
        color: '#FFFFFF',
        padding: 16,
        width: '100%',
        borderRadius: '12px',
    },
    title: {
        color: '#FFFFFF',
        textAlign: 'center',
    }
})

const PrimaryButton = ({ title = 'Primary Button'}) => {
    return (
        <TouchableOpacity style={styles.primary_button_container}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default PrimaryButton;