import { View, Text, Image, Pressable } from "react-native";
import React from "react";

const DressItem = ({ dress }) => {
  return (
    <View
      key={dress.id}
      style={{
        backgroundColor: "white",
        height: 100,
        alignItems: "center",
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Image source={dress?.image} style={{ width: 60, height: 60 }} />
        <View>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            {dress?.name ?? ""}
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            ₹ {dress?.price ?? ""}
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          paddingHorizontal: 22,
          paddingVertical: 6,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "500", color: "red" }}>
          Add
        </Text>
      </Pressable>
    </View>
  );
};

export default DressItem;
