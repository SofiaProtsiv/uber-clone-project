import React, { useEffect, useRef } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrigin,
  setDestination,
  selectOrigin,
} from "../redux/slices/navSlice";
import NavFavorites from "../components/NavFavorites";
import tw from "twrnc";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current?.setAddressText(origin?.description || "");
  }, [origin]);

  return (
    <SafeAreaView style={tw`h-full bg-white`}>
      <View style={tw`p-5`}>
        <Image
          style={{ width: 100, height: 100, resizeMode: "contain" }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />
        <GooglePlacesAutocomplete
          ref={mapRef}
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          placeholder="Where from?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          minLength={2}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          query={{ key: GOOGLE_API_KEY, language: "en" }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
        />
        <NavOptions />
        <NavFavorites />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
