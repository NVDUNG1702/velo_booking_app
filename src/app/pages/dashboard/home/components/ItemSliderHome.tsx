// import { Image, Platform, Text } from "react-native";
// import { typeSlider } from "../../../../datas/home";
// import { View } from "react-native-reanimated/lib/typescript/Animated";
// import { BlurView } from "@react-native-community/blur";
// import { styles } from "..";
// import { SIZES } from "../../../../constans/size";

// interface ItemSliderProps {
//     item: typeSlider
// }

// export const ItemSliderHome = ({ item }: ItemSliderProps) => {
//     const IOS = Platform.OS === 'ios';

//     return (
//         <View style={styles.sliderContainer}>
//             <View style={styles.card}>
//                 <Image
//                     source={{ uri: item.image }}
//                     style={styles.image}
//                     resizeMode="cover"
//                 />
//                 <View style={styles.blurContainer}>
//                     <BlurView
//                         style={styles.blurView}
//                         blurType="dark"
//                         blurAmount={IOS ? 10 : 10}
//                         reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.3)"
//                     >

//                     </BlurView>
//                     <Text style={{ fontSize: SIZES.h0, color: 'white', fontWeight: '800' }}>
//                         {item.title.toLocaleUpperCase()}
//                     </Text>
//                 </View>
//             </View>
//         </View>
//     );
// };