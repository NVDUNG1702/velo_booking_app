import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZES } from '../../constans/size';

export const useSafeAreaStyle = () => {
  const insets = useSafeAreaInsets();
  const heightSafeArea = SIZES.H - (insets.bottom + insets.top);

  const PADDING_TOP = insets.top;
  const PADDING_BOTTOM = insets.bottom;

  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    heightSafeArea,
    PADDING_TOP,
    PADDING_BOTTOM
  };
};