//middleware that retrieves current weather from Weather API
import axios from 'axios';

export const getTemp = await axios.get(process.env.WEATHER_API_1 + process.env.ZIPCODE + process.env.WEATHER_API_2).then(

    (res) => {

        const temp = `${Math.round(res.data.main.temp)}`;
        const weather = `${res.data.weather[0].description}`;

        return (`${temp} F ${weather}`);
    });