import {
  View,
  Text,
  SafeAreaView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const products = useSelector((state) => state.product.product);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, pre) => curr + pre, 0);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);
  const day = new Date().getDay();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  console.log(day);
  const deliveryTime = [
    {
      id: 0,
      name: "2-3 Days",
    },
    {
      id: 1,
      name: "3-4 Days",
    },
    {
      id: 2,
      name: "4-5 Days",
    },
    {
      id: 3,
      name: "3 Days",
    },
    {
      id: 4,
      name: "Tommorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "2",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const navigation = useNavigation();
  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !setDelivery) {
      Alert.alert(
        "Empty or invalid",
        "Please select all the fields",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    if (selectedDate && selectedTime && setDelivery) {
      navigation.replace("Cart");
    }
  };

  return (
    <>
      <ScrollView style={Platform.OS === "android" ? { marginTop: 50 } : null}>
        <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 18 }}>
          Enter Address
        </Text>
        <TextInput
          style={{
            borderWidth: 0.8,
            borderColor: "grey",
            padding: 40,
            paddingVertical: 88,
            borderRadius: 10,
            margin: 10,
          }}
        />
        <View>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 18 }}
          >
            Pick up date
          </Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date(`${year}-${month + 1}-${day}`)}
            endDate={new Date(`${year}-${month + 1}-${day + 30}`)}
            initialSelectedDate={new Date(`${year}-${month + 1}-${day}`)}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={160}
            unselectedItemWidth={50}
            itemHeight={40}
            itemRadius={10}
            // selectedItemTextStyle={styles.selectedItemTextStyle}
            // unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            // flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 18 }}
          >
            Select Time
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item) => (
              <Pressable
                style={
                  selectedTime.includes(item.time)
                    ? {
                        margin: 10,
                        borderRadius: 7,
                        padding: 12,
                        borderColor: "red",
                        borderWidth: 0.7,
                      }
                    : {
                        margin: 10,
                        borderRadius: 7,
                        padding: 12,
                        borderColor: "grey",
                        borderWidth: 0.7,
                      }
                }
                key={item.id}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text
            style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 18 }}
          >
            Delivery Date
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setDelivery(item.name)}
                style={
                  delivery.includes(item.name)
                    ? {
                        margin: 10,
                        borderRadius: 7,
                        padding: 12,
                        borderColor: "red",
                        borderWidth: 0.7,
                      }
                    : {
                        margin: 10,
                        borderRadius: 7,
                        padding: 12,
                        borderColor: "grey",
                        borderWidth: 0.7,
                      }
                }
              >
                <Text>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {total !== 0 ? (
        <Pressable
          style={{
            backgroundColor: "teal",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              {cart.length} items | ${total ?? ""}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "400", color: "#fff" }}>
              extra changes might apply
            </Text>
          </View>
          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#fff" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      ) : null}
    </>
  );
};

export default PickUpScreen;
