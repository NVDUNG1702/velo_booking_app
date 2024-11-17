import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface CheckIconProps {
    width: number;
    height: number;
    strokeColor: string; // Thêm prop để truyền màu stroke
}

const CheckIcon: React.FC<CheckIconProps> = ({ width, height, strokeColor }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
    >
        <Path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            stroke={strokeColor} // Sử dụng strokeColor prop
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

export default CheckIcon;
