import { memo } from 'react';
import { Text, View } from 'react-native'

interface BoxStatusProps {
    color?: string;
    label?: string;
}

export default memo(function BoxStatus({ label, color }: BoxStatusProps) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5 }}>
            <View style={{ width: 20, height: 20, backgroundColor: color, marginEnd: 5 }}>

            </View>
            <Text style={{ color: 'white', fontWeight: '500' }}>{label}</Text>
        </View>
    )
})