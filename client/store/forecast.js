import axios from 'axios'


const GET_WEATHER_FORECAST = 'GET_WEATHER_FORECAST'

const initialForecastState = {
  forecast: {},
  loading: true
}

const getWeatherForecast = forecast => {
  return {
    type: GET_WEATHER_FORECAST,
    forecast
  }
}

export const gotWeatherForecast = (city) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&appid=e5a794f45b32f34f093b7b1683222e60`)
      if (data.cod === '404') {
        const error = new Error('city not found')
        error.status = 404
        throw error
      }
      dispatch(getWeatherForecast(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const forecastReducer = (state = initialForecastState, action) => {
  switch (action.type) {
    case GET_WEATHER_FORECAST:
      return {...state, forecast: action.forecast, loading: false}
    default:
      return state
  }
}
