import React from 'react';
import { Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit"
import { connect } from 'react-redux';
import { Table, Row, Rows } from 'react-native-table-component'

//referenced https://www.npmjs.com/package/react-native-chart-kit
class WeatherForecast extends React.Component {
  constructor(props) {
    super(props)
    this.loadImage = this.loadImage.bind(this)
  }

  loadImage (iconCode) {
    console.log("iconCode: ", iconCode)
    return (
      <Image source={{uri: `http://openweathermap.org/img/wn/${iconCode}@2x.png`}} style={styles.iconImage} />
    )
  }

  render() {

    if (this.props.loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    else {
      const forecastList = this.props.weatherForecast.list
      const tableHead = this.props.weatherForecast.list.map((forecast) => {
        let time = forecast.dt_txt.slice(11,16)
        if (time.slice(0,2) > "12") {
          time = String(+time.slice(0,2) - 12) + ' PM'
        }
        else if (time.slice(0,2) === "00") {
          time = '12 AM'
        }
        else if (time.slice(0,2) === "12") {
          time = '12 PM'
        }
        else {
          time = time.slice(0,2) + ' AM'
        }
        return time
      }).slice(0,8)
      const tableData = [this.props.weatherForecast.list.map((forecast) => {
        let weatherIcon = forecast.weather[0].icon
        return this.loadImage(weatherIcon)
      }).slice(0,8)]
      return (
        <View style={styles.container}>
          <Text style={styles.name}>{this.props.weatherForecast.city.name}</Text>
          <Text style={styles.title}>Forecast</Text>
          <View style={styles.forecastTable}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff', borderRadius: 5}}>
              <Row data={tableHead} style={styles.head} />
              <Rows data={tableData} style={styles.body}/>
            </Table>
          </View>
          <View style={styles.chart}>
            <LineChart
              data={{
                labels: forecastList.map((forecast) => {
                  let time = forecast.dt_txt.slice(11,16)
                  if (time.slice(0,2) > "12") {
                    time = String(+time.slice(0,2) - 12) + 'PM'
                  }
                  else if (time.slice(0,2) === "00") {
                    time = '12AM'
                  }
                  else if (time.slice(0,2) === "12") {
                    time = '12PM'
                  }
                  else {
                    time = time.slice(0,2) + 'AM'
                  }
                  return time
                }).slice(0,8),
                datasets: [
                  {
                    data: forecastList.map((forecast) => {
                      const temp = Math.round((forecast.main.temp - 273.15) * 9/5 + 32)
                      return temp
                    }).slice(0,8)
                  }
                ]
              }}
              width={Dimensions.get("window").width - 20} // from react-native
              height={300}
              yAxisSuffix={`${String.fromCharCode(176)}F`}
              chartConfig={{
                backgroundGradientFrom: "#87CEEB",
                backgroundGradientTo: "#DFF6FF",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `grey`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "grey"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />
          </View>
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
    alignItems: 'center',
    paddingHorizontal: 10
  },
  chart: {
    alignItems: 'center'
  },
  name: {
    fontFamily: "Arial",
    fontWeight: "bold",
    fontSize: 35,
    paddingTop: 30,
    paddingBottom: 20
  },
  title: {
    fontFamily: "Arial",
    fontSize: 20,
    paddingBottom: 30
  },
  forecastTable: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingBottom: 30
  },
  head: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: '#f1f8ff',
    textAlign: 'center',
  },
  body: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  iconImage: {
    width: 40,
    height: 40
  }
});

export default WeatherForecastContainer
