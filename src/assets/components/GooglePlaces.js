import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {CONFIG} from '../../../config'
export default function GooglePlaces({handlePlaceSelected}) {
    return(
        <View style={styles.googlePlacesContainer}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'} showsVerticalScrollIndicator={false} >
            <GooglePlacesAutocomplete
                placeholder="Type an address to search and click to select..."
                onPress={handlePlaceSelected}
                fetchDetails
                enablePoweredByContainer= {false}
                query={{
                    key: `${CONFIG.GOOGLE_PLACES_API_KEY}`,
                    // components: “country:us”,
                    language: `us`,
                    type: `address`,
                    types: `(cities)`,
                }}
                textInputProps={{
                    placeholderTextColor: 'rgba(0, 0, 0, 0.6)',
                    style: styles.googlePlaceTextInput,
                    leftIcon: { type: `font-awesome`, name: `chevron-left` },
                    errorStyle: { color: 'red' } 
                }}
            />
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    googlePlacesContainer: {
        flex: 1,
        borderWidth: 0.5,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#DB9360'
    },
    googlePlaceTextInput: {
        height: 44,
        width: '100%',
        fontSize: 14,
        color: 'rgba(0, 0, 0, 0.6)',
        paddingStart: 10,
        padding: 0,
        borderColor: '#EEF3F7',
        backgroundColor: '#EEF3F7',
      }
  })