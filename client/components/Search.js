import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { gotCityWeather } from '../store/weather'
import { Icon } from 'react-native-elements'
import { gotWeatherForecast } from '../store/forecast';

class Search extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(event) {
    event.preventDefault()
    this.props.loadWeather(this.state.search)
    this.props.loadForecast(this.state.search)
    this.setState({
      search: ''
    })
  }

  updateSearch = (search) => {
    this.setState({search})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Icon name="search" style={styles.searchIcon} />
          <TextInput
            placeholder="Enter City..."
            onChangeText={(search) => this.updateSearch(search)}
            onSubmitEditing={this.onSubmit}
            value={this.state.search}
          />
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadWeather (city) {
      const formattedCity = city[0].toUpperCase() + city.slice(1).toLowerCase()
      const action = gotCityWeather(formattedCity)
      dispatch(action)
    },
    loadForecast (city) {
      const formattedCity = city[0].toUpperCase() + city.slice(1).toLowerCase()
      const action = gotWeatherForecast(formattedCity)
      dispatch(action)
    }
  }
}

const SearchContainer = connect(null, mapDispatchToProps)(Search)

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  search: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#38ACEC'
  },
  searchIcon: {
    fontSize: 25
  },
  searchText: {
    fontSize: 25,
    paddingLeft: 20
  }
});

export default SearchContainer
