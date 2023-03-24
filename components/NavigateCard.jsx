import React, { useEffect, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  selectDestination,
  setDestination,
} from "../redux/slices/navSlice";
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";
import tw from "twrnc";

export default function NavigateCard() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const destination = useSelector(selectDestination);

  useEffect(() => {
    mapRef.current?.setAddressText(destination?.description || "");
  }, [destination]);

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Cood morning, User!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            ref={mapRef}
            styles={inputBoxStyles}
            placeholder="Where to?"
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
            minLength={2}
            fetchDetails={true}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            query={{ key: GOOGLE_API_KEY, language: "en" }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );

              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full ${!destination && "bg-gray-300"}`}
        >
          <Icon name="car" type="font-awesome" color="#fff" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between  bg-white w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="#000"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const inputBoxStyles = StyleSheet.create({
  container: { backgroundColor: "white", paddingTop: 20, flex: 0 },
  textInput: {
    fontSize: 18,
    borderRadius: 0,
    backgroundColor: "#dddddf",
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
