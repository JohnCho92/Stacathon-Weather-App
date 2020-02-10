import axios from 'axios'


const GET_CITY_WEATHER = 'GET_CITY_WEATHER'

const initialWeatherState = {
  weather: {},
  icon: '',
  loading: true
}

const getCityWeather = (weather, icon, map) => {
  return {
    type: GET_CITY_WEATHER,
    weather,
    icon
  }
}

export const gotCityWeather = (city) => {
  return async (dispatch) => {
    try {
      if (!process.env.REACT_APP_API_KEY) {
        console.log('API KEY NOT FOUND')
        require('../../secrets')
      }
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)
      if (data.cod === '404') {
        const error = new Error('city not found')
        error.status = 404
        throw error
      }
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      dispatch(getCityWeather(data, iconUrl))
    } catch (error) {
      console.error(error)
    }
  }
}

export const weatherReducer = (state = initialWeatherState, action) => {
  switch (action.type) {
    case GET_CITY_WEATHER:
      return {...state, weather: action.weather, icon: action.icon, loading: false}
    default:
      return state
  }
}
