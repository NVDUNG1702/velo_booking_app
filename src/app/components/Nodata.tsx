import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import { memo } from 'react'
import data from '../assets/json/nodata.json'

export default memo(function Nodata() {
    return (
        <View style={{ width: '100%', height: 500, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                source={data}
                autoPlay
                style={{ width: 300, height: 500 }}
            />
        </View>
    )
})
