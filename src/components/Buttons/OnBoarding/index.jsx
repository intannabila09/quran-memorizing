import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    button_container: {
        padding: 20,
        borderWidth: '1px',
        borderColor: '#DFDFDF',
        borderRadius: '12px',
        width: '100%',
    },  
    title: {
        fontSize: 20,
        color: '#3F3F3F',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#535353',
    }
})

const OnBoardingButton = ({ title = 'title', subtitle = 'subtitle', ...props}) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{ width: '100%', ...props.style}}>
            <View style={styles.button_container}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View>
                    <Text>{subtitle}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default OnBoardingButton;