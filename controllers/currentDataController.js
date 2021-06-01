const axios = require("axios");
const geoUrl = "https://ipgeolocation.abstractapi.com/v1/?";
const apiKeyGeoUrl = "98b7c6a248b34802bd3fcf925881ed94";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKeyWeatherUrl = "efa8d149eac6732670785efc5884bc65";
const MusixMatchUrl = "https://api.musixmatch.com/ws/1.1/track.search?";
const apiMusixMatchUrl = "52dc2d8f46cd3a0573f6a5d870dbbca8";
const genreChecking = require("../helpers/vocab");

class CurrentData {
    static async getData(req, res) {
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
            };
            const weatherApi = await axios({
                url: `${weatherUrl}${dataLocation.city}&appid=${apiKeyWeatherUrl}`,
            });
            dataWeather = await weatherApi.data.weather[0];
            genre = genreChecking(dataWeather.main);
            // genre = genreChecking("Thunderstorm");
            const dataGenre = await axios({
                url: `${MusixMatchUrl}format=jsonp&callback=callback&f_music_genre_id=${genre}&s_track_rating=desc&quorum_factor=1&apikey=${apiMusixMatchUrl}
                `,
            });
            let dataFormGenre = "";
            for (let index = 9; index < dataGenre.data.length - 2; index++) {
                dataFormGenre += dataGenre.data[index];
            }
            dataFormGenre = JSON.parse(dataFormGenre);
            console.log(dataFormGenre.message.body.track_list[0]);
            let temp = dataFormGenre.message.body.track_list.map((el) => {
                return {
                    id: el.track.track_id,
                    name: el.track.track_name,
                };
            });
            console.log(temp);
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
                    id: temp[index].id,
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
                });
            }
            res.status(200).json({
                location: dataLocation,
                weather: dataWeather,
                querySearch: mapping,
                dataForTitle: nameMapping,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = CurrentData;
