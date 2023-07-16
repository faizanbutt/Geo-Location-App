import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import  MapContainer from './src/screens/MapContainer'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MapContainer/>
      </PersistGate>
    </Provider>
  );
};

export default App;
