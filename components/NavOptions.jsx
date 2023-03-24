import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectOrigin } from "../redux/slices/navSlice";
import tw from "twrnc";
const data = [
  {
    id: "map_screen",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "food_screen",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "FoodScreen",
  },
];

export default function NavOptions() {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 2-40`}
          disabled={!origin}
        >
          <View style={!origin && tw`opacity-40`}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              type="antdesign"
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              size={24}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({});
