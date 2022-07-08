import { TouchableOpacity, StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
    text_button_container: {
        alignText: 'center',
    },
    title: {
        fontSize: 14,
        color: '#7B7B7B',
        textAlign: 'center',
    }
})

const TextButton = ({ title = 'Text Button', style, onPress = () => {}}) => {
    return (
        <TouchableOpacity style={{...styles.text_button_container, ...style}} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

export default TextButton;