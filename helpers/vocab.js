const genreChecking = (mainweahter) => {
    switch (mainweahter) {
        case "Thunderstorm":
            return "1149";
        case "Drizzle":
            return "100003";
        case "Rain":
            return "53";
        case "Snow":
            return "53";
        case "Mist":
            return "1049";
        case "Tornado":
            return "1152";
        case "Clear":
            return "1259";
        case "Clouds":
            return "1259";
        default:
            return "6";
    }
};

module.exports = genreChecking;
