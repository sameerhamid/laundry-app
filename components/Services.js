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
      image: IMAGES.washing,
      name: "Washing",
    },
    {
      id: 2,
      image: IMAGES.washing,
      name: "Landry",
    },
    {
      id: 3,
      image: IMAGES.washing,
      name: "Wash and Iron",
    },
    {
      id: 4,
      image: IMAGES.washing,
      name: "Cleaning",
    },
  ];
  return (
    <View style={{ marginTop: 22 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Services Available
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {services.map((item) => {
          return (
            <Pressable
              style={{
                marginRight: 14,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: Dimensions.get("screen").width / 3,
                  height: Dimensions.get("screen").width / 3,
                  objectFit: "contain",
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {item.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Services;
