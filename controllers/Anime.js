const axios = require('axios')


class Anime{
    static anime(req,res,next){
        let search=req.params.anime
        axios({
            method: 'GET',
        url:`https://api.jikan.moe/v3/search/anime?q=${search}`
        })
        .then((response)=>{
            console.log(response)
            res.status(200).json(response.data)
        }).catch(err=>{
            console.log(err);
            res.status(500).json(err)
        })
    }
}

module.exports = Anime