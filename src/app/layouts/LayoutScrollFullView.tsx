import React from 'react';
import {
    ScrollView,
    StyleSheet,
    ViewStyle,
    ScrollViewProps,
    StyleProp,
} from 'react-native';
import { useModeColor } from '../hooks/ColorMode/UseModeTheme';

interface FullScreenScrollViewProps extends ScrollViewProps {
    style?: StyleProp<ViewStyle>; // Style của ScrollView
    contentStyle?: StyleProp<ViewStyle>; // Style của nội dung bên trong
}

const ScrollFullView: React.FC<FullScreenScrollViewProps> = ({
    children,
    style,
    contentStyle,
    ...rest
}) => {
    const { backgroundStyle } = useModeColor();
    return (
        <ScrollView
            style={[styles.scrollContainer, style, backgroundStyle]}
            contentContainerStyle={[styles.contentContainer, contentStyle]}
            showsVerticalScrollIndicator={false}
            {...rest} // Truyền thêm các props khác vào ScrollView
        >
            {children}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flex: 1, // Chiếm toàn bộ chiều cao màn hình
    },
    contentContainer: {
        flexGrow: 1, // Cho phép nội dung co giãn
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
});

export default ScrollFullView;