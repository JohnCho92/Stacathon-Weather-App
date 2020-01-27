import axios from 'axios'


const GET_CITY_WEATHER = 'GET_CITY_WEATHER'

const initialWeatherState = {
  weather: {},
  loading: true
}

const getCityWeather = weather => {
  return {
    type: GET_CITY_WEATHER,
    weather
  }
}

export const gotCityWeather = (city) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e5a794f45b32f34f093b7b1683222e60`)
      if (data.cod === '404') {
        const error = new Error('city not found')
        error.status = 404
        throw error
      }
      dispatch(getCityWeather(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const weatherReducer = (state = initialWeatherState, action) => {
  switch (action.type) {
    case GET_CITY_WEATHER:
      return {...state, weather: action.weather, loading: false}
    default:
      return state
  }
}
