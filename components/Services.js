import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import React from "react";
import { IMAGES } from "../assets/images";

const Services = () => {
  const services = [
    {
      id: 0,
      image: IMAGES.grocery1,
      name: "Washing",
    },
    {
      id: 2,
      image: IMAGES.grocery1,
      name: "Landry",
    },
    {
      id: 3,
      image: IMAGES.grocery1,
      name: "Wash and Iron",
    },
    {
      id: 4,
      image: IMAGES.grocery1,
      name: "Cleaning",
    },
  ];
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          {services.map((item) => {
            return (
              <Pressable style={{ width: Dimensions.get("screen").width / 3 }}>
                <Image
                  source={item.image}
                  style={{
                    width: Dimensions.get("screen").width / 3,
                    height: Dimensions.get("screen").width / 3,
                  }}
                />
                <Text>{item.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;
