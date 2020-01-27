import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import SearchContainer from './client/components/Search';
import WeatherTabView from './client/components/TabView'
import store from './client/store/index'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
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
  }
});
