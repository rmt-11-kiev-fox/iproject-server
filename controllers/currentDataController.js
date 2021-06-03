const axios = require("axios");
const geoUrl = "https://ipgeolocation.abstractapi.com/v1/?";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const MusixMatchUrl = "https://api.musixmatch.com/ws/1.1/track.search?";
const apiKeyGeoUrl = process.env.API_KEY_GEO_URL;
const apiKeyWeatherUrl = process.env.API_KEY_WEATHER_URL;
const apiMusixMatchUrl = process.env.API_KEY_MUSIXMATCH_URL;
const genreChecking = require("../helpers/vocab");
const { EmbeddedData } = require("../models");

class CurrentData {
    static async getData(req, res) {
        console.log("masuk getData");
        let dataLocation = {};
        let dataWeather = {};
        let genre;
        try {
            const dataGeo = await axios({
                url: `${geoUrl}api_key=${apiKeyGeoUrl}`,
            });
            dataLocation = {
                ip_address: dataGeo.data.ip_address,
                country: dataGeo.data.country,
                city: dataGeo.data.city,
                flag: dataGeo.data.flag.png,
            };
            const weatherApi = await axios({
                url: `${weatherUrl}${dataLocation.city}&appid=${apiKeyWeatherUrl}`,
            });
            dataWeather = {
                id: weatherApi.data.weather[0].id,
                main: weatherApi.data.weather[0].main,
                description: weatherApi.data.weather[0].description,
                icon: `https://openweathermap.org/img/wn/${weatherApi.data.weather[0].icon}@2x.png`,
                temperature: `${Math.round(weatherApi.data.main.temp - 273.15)} Celcius`,
            };
            genre = genreChecking(dataWeather.main);
            // genre = genreChecking("Thunderstorm");
            const dataGenre = await axios({
                url: `${MusixMatchUrl}format=jsonp&callback=callback&f_music_genre_id=${genre}&s_track_rating=desc&quorum_factor=1&apikey=${apiMusixMatchUrl}
                `,
            });
            console.log(apiMusixMatchUrl, "<<<<< ENV");
            let dataFormGenre = "";
            for (let index = 9; index < dataGenre.data.length - 2; index++) {
                dataFormGenre += dataGenre.data[index];
            }
            dataFormGenre = JSON.parse(dataFormGenre);
            console.log(dataFormGenre, "<<<<<<<<<<<");
            let temp = dataFormGenre.message.body.track_list.map((el) => {
                return {
                    id: el.track.track_id,
                    name: el.track.track_name,
                };
            });
            let mapping = [];
            let nameMapping = [];
            for (let index = 0; index < temp.length; index++) {
                let dataTemp = "";
                for (let index2 = 0; index2 < temp[index].name.length; index2++) {
                    if (temp[index].name[index2] === "(") break;
                    if (temp[index].name[index2] === " ") {
                        dataTemp += "+";
                        continue;
                    }
                    dataTemp += temp[index].name[index2];
                }
                mapping.push({
                    // id: temp[index].id,
                    query: `https://www.youtube.com/results?search_query=${dataTemp}`,
                });
            }
            for (let index = 0; index < temp.length; index++) {
                let dataTemp = "";
                for (let index2 = 0; index2 < temp[index].name.length; index2++) {
                    if (temp[index].name[index2] === "(") break;
                    dataTemp += temp[index].name[index2];
                }
                nameMapping.push({
                    id: temp[index].id,
                    title: dataTemp,
                    query: mapping[index].query,
                });
            }
            let output = [];
            let dataEmbedded = await EmbeddedData.findAll();
            for (let index = 0; index < 9; index++) {
                let variable = Math.ceil(Math.random() * dataEmbedded.length);
                output.push(dataEmbedded[variable]);
            }
            res.status(200).json({
                location: dataLocation,
                weather: dataWeather,
                querySearch: output,
                dataForTitle: nameMapping,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = CurrentData;
