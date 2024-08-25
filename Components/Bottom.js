import React, { useEffect } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
const screenWidth = Dimensions.get("window").width;
import Swiper from "react-native-swiper";

export default function Bottom({ gener, list }) {
  const carouselData = list?.map((element) => ({
    image: `${element.artworkUrl100}`,
    title: `${element.trackName}`,
    url: `${element?.trackViewUrl}`,
  }));
  useEffect(() => {
    console.log(`list is ${JSON.stringify(list[0])}`);
  });

  return (
    <ScrollView style={{}}>
      <Text
        style={{
          fontSize: 20,
          color: "#c2c2c2",
          margin: 15,
          fontWeight: "bold",
        }}
      >
        {" "}
        More From genre : {gener}{" "}
      </Text>

      <Swiper style={{ height: 400, backgroundColor: "#2f2e2e" }}>
        {carouselData.map((item, index) => (
          <View
            key={index}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`${item?.url}`);
              }}
              style={{
                height: 300,
                width: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "90%", height: 250, resizeMode: "cover" }}
              />
            </TouchableOpacity>
            <Text
              numberOfLines={2}
              style={{
                textAlign: "center",
                fontSize: 26,
                color: "white",
                fontWeight: "bold",
              }}
            >
              {item.title}
            </Text>
          </View>
         
        ))}
      </Swiper>
    </ScrollView>
  );
}
