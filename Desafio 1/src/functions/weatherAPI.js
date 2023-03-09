const axios = require('axios');
const add = require('date-fns/add');
const format = require('date-fns/format');
require('dotenv').config();

function cidadePortuguesIngles (cidadeEmPortugues) {
    const cidadePortuguesIngles = [
        {
            portugues: 'Nova York',
            ingles: 'New York'
        },
        {
            portugues: 'Rio de Janeiro',
            ingles: 'Rio de Janeiro'
        },
        {
            portugues: 'Tóquio',
            ingles: 'Tokyo'
        }
    ]
    let cidadeEmIngles; 

    for(element of cidadePortuguesIngles) {
        if(cidadeEmPortugues === element.portugues) {
            cidadeEmIngles = element.ingles;
        }
    }
    return cidadeEmIngles;
}

async function mediaDaSemana (cidade) {
    const APIkey = process.env.WEATHER_API;
    let mediasDeTemperatura = [];
    const cidadeEmIngles = cidadePortuguesIngles(cidade);
    
    for(let i = -1; i > -8; i--) {
        //Começa pela data de ontem, que é formatada em yyyy-mm-dd. A cada laço subtrai-se um dia
        let data = format(add(new Date(), {days: i}), 'yyyy-LL-dd')
        let url = `http://api.weatherapi.com/v1/history.json?key=${APIkey}&q=${cidadeEmIngles}&dt=${data}`;
        try {
            const response = await axios.get(url);
            const mediaDoDia = response.data.forecast.forecastday[0].day.avgtemp_c;
            mediasDeTemperatura.push(mediaDoDia);
        } catch (erro) {
            throw new Error(erro.message);
        }
    }
    let mediaDaSemana = mediasDeTemperatura.reduce((a , b) => a + b, 0) / mediasDeTemperatura.length;
    return mediaDaSemana;
}

module.exports = {mediaDaSemana};


