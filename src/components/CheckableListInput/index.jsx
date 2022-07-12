import { FlatList, SafeAreaView, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#FBFBFB',
        borderRadius: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    }
})

const CheckableListInput = ({
        items = [],
        style = {},
        renderItem = () => {},
    }) => {
    return (
        <SafeAreaView
            style={{
                ...styles.container,
                ...style
            }}
        >
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{
                    padding: 8,
                    paddingBottom: 12,
                }}
            />
        </SafeAreaView>
    )
}

export default CheckableListInput;