import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, ScrollView, TouchableOpacity} from 'react-native';
import {global_styles} from '../styles/Style'
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getLocationFromLatLng} from '../functions/getLocationFromCoordinates'

export default SearchHistory = ({setShowHistory, places, addPlace, setLocationAddress1, setLocationAddress2}) => {
    
    const handleNavigateFromHistory =(latitude, longitude) => {
        getLocationFromLatLng(latitude, longitude, places, addPlace, setLocationAddress1, setLocationAddress2)
        setShowHistory(false)
    }

  return (
    <View style={styles.mainContainer}>
        <View style={{flexDirection: 'row-reverse'}}>
            <TouchableHighlight activeOpacity={0.6} underlayColor="#5892F3" style={[global_styles.mapIconsBackground, {marginTop: 15, marginRight: 5}]} onPress={()=>setShowHistory(false)}>
                <Foundation name={"map"} size={25} color="#303E67"/>
            </TouchableHighlight>
        </View>
    <Text style={styles.HeaderText}>Here's the history of your search</Text>
    <ScrollView showsVerticalScrollIndicator={false}>
    {places && places.map((place, index) => (
        <View style={styles.SearchListContainer}>
            {(()=>{
                let latitude = place.latitude
                let longitude = place.longitude
                return <>
                    <View style={styles.searchListItem}>
                        <View>
                            <Text style={global_styles.locationAddress1Text} key={index}>{place.address1}</Text>
                            <Text style={global_styles.locationAddress2Text} key={index}>{place.address2}</Text>
                        </View>
                        <TouchableOpacity onPress={()=> handleNavigateFromHistory(latitude, longitude)}>
                            <Ionicons name="navigate" size={30} color="#303E67"/>
                        </TouchableOpacity>
                    </View>
                </>
            })()}
        </View>
    ))}
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1
    },
    HeaderText: {
        fontSize: 14,
        color: '#545454',
        paddingBottom: 5,
        paddingLeft: 10,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    SearchListContainer: {
        borderBottomColor: "#f5f5f5",
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    searchListItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})