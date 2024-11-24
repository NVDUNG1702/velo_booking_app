
import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface BoxSVGIconProps {
    width?: number;
    height?: number;
    border?: string; // Thêm prop để truyền màu stroke
    fill?: string;
}

const BoxSVG: React.FC<BoxSVGIconProps> = ({ width, height, border = "#cc7ca1", fill = "#5a082e" }) => (
    <Svg 
        width={width || "90%"} height={height || "55"} viewBox="0 0 316 55" fill="none" >
        <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.5667 0.961914C10.2336 0.961914 9.9142 1.09422 9.67869 1.32973L0.367819 10.6406C0.132309 10.8761 0 11.1955 0 11.5286V49.9387C0 52.7129 2.24899 54.9619 5.02326 54.9619H305.433C305.766 54.9619 306.086 54.8296 306.321 54.5941L315.632 45.2832C315.868 45.0477 316 44.7283 316 44.3952V5.98517C316 3.2109 313.751 0.961914 310.977 0.961914H10.5667ZM314.744 38.6363L299.674 53.7061H5.02326C2.94256 53.7061 1.25581 52.0194 1.25581 49.9387V17.2875L8.7907 9.75261L16.3256 2.21773C16.3256 2.21773 308.896 2.21773 310.977 2.21773C313.057 2.21773 314.744 3.90447 314.744 5.98517V38.6363Z" fill={border} />
        <Path d="M299.674 53.7061L314.744 38.6363V5.98517C314.744 3.90447 313.057 2.21773 310.977 2.21773H16.3256L8.7907 9.75261L1.25581 17.2875V49.9387C1.25581 52.0194 2.94256 53.7061 5.02326 53.7061H299.674Z" fill={fill} />
    </Svg>
);

export default BoxSVG;
