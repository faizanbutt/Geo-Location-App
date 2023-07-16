import {StyleSheet} from 'react-native';

export const global_styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f4',
  },
  activityIndicatorView: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    backgroundColor: "#F9F9F3",
    right: 0,
    bottom: 0,
    top: 0,
    flex: 1,
    zIndex: 1,
  },
  mapIconsBackground: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    marginVertical: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
},
locationAddress1Text: {
    color: '#303E67',
    fontSize: 12,
    fontWeight: 'bold'
},
locationAddress2Text: {
    color: '#303E67',
    fontSize: 12
},
});