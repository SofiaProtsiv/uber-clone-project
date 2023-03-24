import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../redux/slices/navSlice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const data = [
  {
    id: "h1",
    icon: "home",
    location: "Home",
    route: {
      description: "вулиця Велика Китаївська, 59, Kyiv, Ukraine",
      location: { lat: 50.4019694, lng: 30.5313562 },
    },
  },
  {
    id: "w2",
    icon: "briefcase",
    location: "Work",
    route: {
      description: "вулиця Казимира Малевича, 86, Kyiv, Ukraine",
      location: { lat: 50.4141866, lng: 30.5192725 },
    },
  },
];
export default function NavFavorites() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const selectRoute = (data) => {
    if (route.name === "HomeScreen") {
      dispatch(
        setOrigin({
          location: data.location,
          description: data.description,
        })
      );

      dispatch(setDestination(null));
    } else {
      dispatch(
        setDestination({
          location: data.location,
          description: data.description,
        })
      );
      navigation.navigate("RideOptionsCard");
    }
  };
  return (
    <FlatList
      ItemSeparatorComponent={() => (
        <View style={[tw`bg-gray-200`, { height: 0.5 }]}></View>
      )}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
          onPress={() => selectRoute(item?.route)}
        >
          <Icon
            name={item.icon}
            type="ionicon"
            color="#fff"
            size={18}
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{item.location}</Text>
            <Text style={tw`text-gray-500`}>{item?.route?.description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({});
