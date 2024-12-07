import { setCustomText } from 'react-native-global-props';
import { SIZES } from '../app/constans/size';

const customTextProps = {
  style: {
    fontFamily: 'Roboto-Bold',
    fontSize: SIZES.h4,
  },
};

setCustomText(customTextProps);