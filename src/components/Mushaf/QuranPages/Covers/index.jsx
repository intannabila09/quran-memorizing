import { View } from 'react-native'

const AyahCovers = ({
    covers
}) => {
    return (
        <View
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                elevation: 2,
                zIndex: 2,
            }} 
        >
            {
                covers.length > 0
                && covers.map((item) => {
                    const {
                        top,
                        right,
                        height,
                        width,
                    } = item
                    return (
                        <View
                            key={`${top}-${right}`}
                            style={{
                                position: 'absolute',
                                top: `${top}%`,
                                right: `${right}%`,
                                width: `${width}%`,
                                height: `${height}%`,
                                backgroundColor: '#f8f5e9'
                            }}
                        />
                    )
                })
            }
        </View>
    )
}

export default AyahCovers