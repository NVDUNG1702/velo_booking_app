import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SIZES } from '../../constans/size';

export const useSafeAreaStyle = () => {
  const insets = useSafeAreaInsets();
  const heightSafeArea = SIZES.H - (insets.bottom + insets.top);
  return {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    heightSafeArea
  };
};