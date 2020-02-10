import React from 'react';
import { Image, StyleSheet, Dimensions , View } from 'react-native';
import { Provider } from 'react-redux'
import SearchContainer from './client/components/Search';
import WeatherTabView from './client/components/TabView'
import store from './client/store/index'
import openWeatherLogo from './assets/OPENWEATHER.png'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Image source={openWeatherLogo} style={styles.logo} />
          <SearchContainer />
          <WeatherTabView />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
  },
  logo: {
    width: 200,
    height: 50,
    resizeMode: 'stretch',
  }
});
