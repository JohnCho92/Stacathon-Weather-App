import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

class WeatherForecast extends React.Component {

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
          <Text>{this.props.weatherForecast.city.name}</Text>
        </View>
      )
    }
  }
}

const mapToState = (state) => {
  return {
    weatherForecast: state.weatherForecast.forecast,
    loading: state.weatherForecast.loading
  }
}

const WeatherForecastContainer = connect(mapToState)(WeatherForecast)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 5,
  }
});

export default WeatherForecastContainer
