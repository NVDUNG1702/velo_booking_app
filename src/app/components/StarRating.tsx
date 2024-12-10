import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import StarFullIcon from '../assets/IconComponents/star/FullStar';
import StarHalfIcon from '../assets/IconComponents/star/StaHalf';
import { SIZES } from '../constans/size';

interface StarRatingProps {
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                // Sao đầy
                stars.push(
                    <StarFullIcon size={SIZES.icon15} color='orange' key={i} />
                );
            } else if (rating >= i - 0.5) {
                // Nửa sao
                stars.push(
                    <StarHalfIcon size={SIZES.icon15} color='orange' key={i} />
                );
            } else {
                // Sao trống
                stars.push(
                    <StarFullIcon size={SIZES.icon15} color='#d2d2d2' key={i} />
                );
            }
        }
        return stars;
    };

    return <View style={styles.starContainer}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starIcon: {
        width: 24,
        height: 24,
        marginRight: 2,
    },
});

export default StarRating;