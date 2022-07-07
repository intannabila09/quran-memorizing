import { View } from "react-native"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FFFFFF',
    }
})

const InputMemorization = () => {
    return (
        <View style={styles.container}>
            Input Memorization
        </View>
    )
}

export default InputMemorization;