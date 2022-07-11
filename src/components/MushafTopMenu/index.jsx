import { Text, Animated } from "react-native"

const MushafTopMenu = ({ top = 0 }) => {
    return (
        <Animated.View
            style={{
                width: '100%',
                height: 50,
                backgroundColor: '#FFFFFF',
                position: 'absolute',
                top: top,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#E0E0E0',
                paddingTop: 4,
                zIndex: 3
            }}
        >
            <Text>Top Menu</Text>
        </Animated.View>
    )
}

export default MushafTopMenu;