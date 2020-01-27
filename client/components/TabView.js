import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import CurrentWeatherContainer from './CurrentWeather'
import WeatherForecastContainer from './WeatherForecast'

//referenced https://github.com/react-native-community/react-native-tab-view

const CurrentWeatherRoute = () => (
  <View>
    <CurrentWeatherContainer style={styles.scene}/>
  </View>
);

const WeatherForecastRoute = () => (
  <View>
    <WeatherForecastContainer style={styles.scene} />
  </View>
);

const WeatherMapRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
);

const initialLayout = { width: Dimensions.get('window').width };

const WeatherTabView = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'currentWeather', title: 'Current Weather' },
    { key: 'weatherForecast', title: 'Weather Forecast' },
    { key: 'weatherMap', title: 'Weather Map' }
  ]);

  const renderScene = SceneMap({
    currentWeather: CurrentWeatherRoute,
    weatherForecast: WeatherForecastRoute,
    weatherMap: WeatherMapRoute
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height
  }
});

export default WeatherTabView
