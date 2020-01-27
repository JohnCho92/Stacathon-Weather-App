import React from 'react';
import { Text, TextInput, StyleSheet, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';

class CurrentWeather extends React.Component {

  render() {
    if (this.props.loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.name}>{this.props.cityWeather.name}</Text>
          <Text style={styles.weather}>{this.props.cityWeather.weather[0].main}</Text>
          <Text style={styles.temp}>Now: {Math.round((this.props.cityWeather.main.temp - 273.15) * 9/5 + 32) + ' ' + String.fromCharCode(176)}F</Text>
          <Text style={styles.humidity}>Humidity: {this.props.cityWeather.main.humidity} %</Text>
          <Text style={styles.max_min}>Max Temp: {Math.round((this.props.cityWeather.main.temp_max - 273.15) * 9/5 + 32) + ' ' + String.fromCharCode(176)}F</Text>
          <Text style={styles.max_min}>Min Temp: {Math.round((this.props.cityWeather.main.temp_min - 273.15) * 9/5 + 32) + ' ' + String.fromCharCode(176)}F</Text>
        </View>
      )
    }
  }
}

const mapToState = (state) => {
  return {
    cityWeather: state.cityWeather.weather,
    loading: state.cityWeather.loading
  }
}

const CurrentWeatherContainer = connect(mapToState)(CurrentWeather)

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    alignItems: "center",
  },
  name: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: 100,
    paddingBottom: 10
  },
  weather: {
    fontFamily: "Arial",
    fontSize: 30,
    paddingBottom: 100
  },
  temp: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 25,
    paddingBottom: 100
  },
  humidity: {
    fontFamily: "Arial",
    fontSize: 20,
    paddingBottom: 10
  },
  max_min: {
    fontFamily: "Arial",
    fontSize: 20,
    paddingBottom: 10
  },
});

export default CurrentWeatherContainer
