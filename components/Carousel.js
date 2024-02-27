import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { IMAGES } from "../assets/images";

const Carousel = () => {
  const images = [IMAGES.laundry1, IMAGES.laundry2];
  return (
    <View>
      <SliderBox
        images={images}
        autoplay
        circleLoop
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        ImageComponentStyle={{ borderRadius: 6, objectFit: "cover" }}
        parentWidth={Dimensions.get("screen").width - 33}
      />
    </View>
  );
};

export default Carousel;
