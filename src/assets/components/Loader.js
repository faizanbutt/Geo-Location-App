import React from 'react';
import {Text, View, ActivityIndicator, StyleSheet} from 'react-native';
export default function Loader() {
    return(
        <View style={loader_style.loaderOuterContainer}>
            <View style={loader_style.loaderContainer}>
                <ActivityIndicator size="large" color='#1B4D7E'/>
                <Text style={{fontSize: 14, color: "#1B4D7E", fontFamily: 'Poppins-SemiBold', fontWeight: "600" }}>Loading</Text>
            </View>
        </View>
    )
}

const loader_style = StyleSheet.create({
    loaderOuterContainer:{
      flex: 1,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loaderContainer:{
      borderRadius: 15,
    }
  })