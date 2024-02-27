import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
  Pressable,
  Image,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";

import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

import { IMAGES } from "../assets/images";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import { services } from "./data";
import DressItem from "../components/DressItem";

const HomeScreen = () => {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [loacationServicesEnabled, setLocationServicesEnabled] =
    useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location sevices are not enabled",
        "Please enable the location sevices",
        [
          {
            text: "Cancle",
            onPress: () => console.log("cancle pressed"),
          },

          {
            cancelable: false,
          },
        ]
      );
    } else {
      setLocationServicesEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow the app to use the location services",
        [
          {
            text: "Cancle",
            onPress: () => console.log("cancle pressed"),
          },

          {
            cancelable: false,
          },
        ]
      );
    }
    const { coords } = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longitude } = coords;

      let res = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(res);
      for (let item of res) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setDisplayCurrentAddress(address);
      }
    }
  };

  const renderLocationAndProfile = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
            gap: 6,
          }}
        >
          <MaterialIcons name="location-on" size={30} color="red" />
          <View style={{ width: Dimensions.get("screen").width - 160 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
        </View>

        <Pressable>
          <Image
            style={{ width: 50, height: 50, borderRadius: 25 }}
            source={IMAGES.profile}
          />
        </Pressable>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#cccc",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for items and more" style={{}} />
        <FontAwesome name="search" size={24} color="red" />
      </View>
    );
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "#F0F0F0",
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: Platform.OS === "android" ? 34 : 0,
        width: Dimensions.get("screen").width,
      }}
    >
      {/* location and profile  */}
      {renderLocationAndProfile()}
      {/* search bar  */}
      {renderSearchBar()}

      <Carousel />

      {/* render services  */}

      <Services />
      {/* render all items  */}

      <View
        style={{
          marginTop: 22,
          gap: 16,
          marginBottom: Platform.OS === "android" ? 44 : 0,
        }}
      >
        {services.map((item) => (
          <DressItem dress={item} key={item.id} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
