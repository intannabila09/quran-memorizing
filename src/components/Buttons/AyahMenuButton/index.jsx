import { TouchableOpacity, Text, View } from "react-native"

const AyahMenuButton = ({ menu }) => {
    const { icon, label } = menu
    return (
        <TouchableOpacity
            style={{
                padding: 16,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: "#ededed",
                marginBottom: 8,
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <View style={{ marginRight: 4, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </View>
            <Text>{label}</Text>
        </TouchableOpacity>
    )
}

export default AyahMenuButton;