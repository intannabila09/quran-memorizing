import { SafeAreaView, ScrollView, View } from 'react-native'
import UpperSection from 'components/Homepage/UpperSection';
import LowerSection from 'components/Homepage/LowerSection';
import { StatusBar } from 'expo-status-bar';

const Homepage = () => {
    return (
        <>
        <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 48}} />
            <SafeAreaView>
                <ScrollView>
                    <UpperSection />
                    <LowerSection />
                </ScrollView>
                <StatusBar style="dark" />
            </SafeAreaView>
        </>
    )
}

export default Homepage;