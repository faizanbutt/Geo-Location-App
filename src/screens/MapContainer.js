import React, {useState, useRef, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableHighlight} from 'react-native';
import {global_styles} from '../assets/styles/Style';
import MapView, {MarkerAnimated} from 'react-native-maps';
import Loader from '../assets/components/Loader'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CONFIG} from '../../config'
import {connect} from 'react-redux';
import {addPlace} from '../../redux/actions';
import {getLocationFromLatLng} from '../assets/functions/getLocationFromCoordinates'
import SearchHistory from '../assets/components/SearchHistory'
import GooglePlaces from '../assets/components/GooglePlaces'

const MapScreen = ({ places, addPlace }) => {
let latitude = places && places.length >0 ? places[places.length-1].latitude : 0
let longitude = places && places.length >0 ? places[places.length-1].longitude : 0
const mapRef = useRef(null);
const [isLoading, setLoading] = useState(true)
const [isFullScreen, setFullScreen] = useState(true)
const [isShowMap, setShowMap] = useState(latitude && longitude ? true : false)
const [isShowHistory, setShowHistory] = useState(false)
const [currentLocation, setCurrentLocation] = useState({latitude, longitude});
const [locationAddress1, setLocationAddress1] = useState(null);
const [locationAddress2, setLocationAddress2] = useState(null);

useEffect(()=> {
    if(latitude && longitude){
        getLocationFromLatLng(latitude, longitude, places, addPlace, setLocationAddress1, setLocationAddress2)
        setLoading(false)    
    }else
        setLoading(false)
},[])

async function getLatLngFromLocation(address) {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${CONFIG.GOOGLE_PLACES_API_KEY}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'OK') {
                const result = data.results[0];
                let {lat, lng} = result.geometry.location;
                let latitude = parseFloat(lat)
                let longitude = parseFloat(lng)
                getLocationFromLatLng(latitude, longitude, places, addPlace, setLocationAddress1, setLocationAddress2)
                setCurrentLocation({latitude, longitude})
                handleAnimateToRegion(latitude, longitude)
            }
        }
    }catch (error) {
        console.warn('error',error);
    }
}

const handlePlaceSelected = (place) => {
    setLocationAddress1(place.description);
    getLatLngFromLocation(place.description)
    setFullScreen(true)
    setShowMap(true)
};

const handleAnimateToRegion = (latitude, longitude) => {
    const region = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    mapRef.current.animateToRegion(region, 1000); // Animation duration is 1000 milliseconds
}

    return (
        <SafeAreaView style={global_styles.safeArea}>
            {(isLoading) ?
            <View style={global_styles.activityIndicatorView}>
                <Loader/>
            </View>:<>
            {isShowHistory ?
                <SearchHistory setShowHistory={setShowHistory} places={places} addPlace={addPlace} setLocationAddress1={setLocationAddress1} setLocationAddress2={setLocationAddress2}/>
            :isShowMap ?
            <View style={styles.mainContainer}>
                <MapView
                    ref={mapRef}
                    style={styles.mapContainer}
                    minZoomLevel={15}
                    toolbarEnabled
                    initialRegion={{
                        latitude: currentLocation && currentLocation.latitude,
                        longitude: currentLocation && currentLocation.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        showsIndoors: true
                    }}
                >
                <MarkerAnimated coordinate={{latitude: currentLocation.latitude ? currentLocation.latitude : 0, longitude: currentLocation.longitude ? currentLocation.longitude : 0}}>
                    <Ionicons name="md-location" size={32} color="red"/>
                </MarkerAnimated>
                </MapView>
                <View style={styles.mapIconsContainer}>
                    <TouchableHighlight activeOpacity={0.6} underlayColor="#5892F3" style={global_styles.mapIconsBackground} onPress={()=>setShowHistory(true)}>
                        <MaterialIcons name="history" size={30} color="#303E67"/>
                     </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.6} underlayColor="#5892F3" style={global_styles.mapIconsBackground} onPress={()=> setFullScreen(!isFullScreen)}>
                        {isFullScreen ? 
                        <FontAwesome name={isFullScreen ? "pencil" : "chevron-down"} size={25} color="#303E67"/> 
                        :<MaterialIcons name="fullscreen" size={30} color="red"/>}
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={0.6} underlayColor="#5892F3" style={global_styles.mapIconsBackground} onPress={()=>handleAnimateToRegion(currentLocation.latitude, currentLocation.longitude)}>
                         <MaterialIcons name="my-location" size={30} color="#303E67"/>
                     </TouchableHighlight>
                </View>
                {!isFullScreen && <GooglePlaces handlePlaceSelected={handlePlaceSelected}/>}
                <View style={{marginHorizontal: 15}}>
                    <View style={styles.locationDetailContainer}>
                        <View style={styles.locationIconBackground}>
                            <MaterialIcons name="location-pin" size={20} color="#00A883"/>
                        </View>
                        <View style={{marginLeft: 10, width: '90%'}}>
                            <Text style={global_styles.locationAddress1Text} numberOfLines={1}>{locationAddress1}</Text>
                            <Text style={global_styles.locationAddress2Text} numberOfLines={1}>{locationAddress2}</Text>
                        </View>
                    </View>
                </View>
            </View>
            :<GooglePlaces handlePlaceSelected={handlePlaceSelected}/>}
            </>}
        </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
    places: state.places,
  });
  
  const mapDispatchToProps = {
    addPlace,
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
    },
    mapContainer: {
      flex: 1,
    },
    mapIconsContainer: {
        position: 'absolute',
        marginTop: 10,
        marginLeft: 5
    },
    locationIconBackground: {
        backgroundColor: '#fff',
        width: 30,
        height: 30,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#00A883',
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20
    },
  });