declare module 'react-native-global-props' {
    import { TextProps } from 'react-native';

    export interface CustomTextProps {
        style?: TextProps['style'];
    }

    export const setCustomText: (props: CustomTextProps) => void;
}
