import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

const YourComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      },
      error => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, distanceFilter: 10 }
    );

    // Watcher'ı temizleme
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18 }}>
        {location
          ? `Latitude: ${location.latitude}, Longitude: ${location.longitude}`
          : 'Fetching location...'}
      </Text>
    </View>
  );
};

export default YourComponent;
