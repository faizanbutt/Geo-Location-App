import {CONFIG} from '../../../config'
export async function getLocationFromLatLng(latitude, longitude, places, addPlace, setLocationAddress1, setLocationAddress2) {
    try {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${CONFIG.GOOGLE_PLACES_API_KEY}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            if (data.status === 'OK') {
                const result = data.results[0];
                const streetNumber = getComponentByType(result, 'street_number')
                const streetAddress = getComponentByType(result, 'route');
                const city = getComponentByType(result, 'sublocality_level_1');
                const state = getComponentByType(result, 'administrative_area_level_1');
                const country = getComponentByType(result, 'country');
                const postalCode = getComponentByType(result, 'postal_code');
                let includesInHistory = places && places.length >0 ? places.map(obj => obj.latitude === latitude || obj.longitude === longitude).includes(true) : false
                if(!includesInHistory)
                    addPlace({address1: streetNumber+' '+streetAddress+" "+city, address2: state+' '+country+' '+postalCode, latitude, longitude})
                setLocationAddress1(streetNumber+' '+streetAddress+" "+city)
                setLocationAddress2(state+' '+country+' '+postalCode)
            }
        }
    }catch (error) {
        console.warn(error)
    }
}

function getComponentByType(result, type) {
    const component = result.address_components.find(component =>component.types.includes(type));
    return component ? component.long_name : '';
}