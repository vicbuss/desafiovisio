const mongoose = require('mongoose');
const weatherAPI = require('../functions/weatherAPI');

function diferenteDeTitulo(valor) {
	return valor !== this.titulo;
}

const baseSchema = new mongoose.Schema ({
	titulo: {
		type: String,
		required: true,
		unique: true
	},
	
	nomeFachada : {
		type: String,
		required: true,
		validate: [diferenteDeTitulo, '{VALUE} deve ser diferente do título']
	},
	
	cidade : {
		type: String,
		required: true,
		enum: {
		values: ["Nova York", "Rio de Janeiro", "Tóquio"],
		message: '{VALUE} não é uma cidade coberta pela associação.'	
		}
	},
	
	tecnologias : [{
		type: String,
		enum: {
			values: ["laboratório de nanotecnologia", "jardim de ervas venenosas", "estande de tiro", "academia de parkour"],
			message: '{VALUE} não é uma tecnologia disponível para instalação'  
		} 
	}],

	mediaDaSemana : {
		type: Number
	}
})

baseSchema.pre('save', async function preSaveFunction() {
	try {
		const mediaDaSemana = await weatherAPI.mediaDaSemana(this.cidade);
		this.mediaDaSemana = mediaDaSemana; 
	} catch (erro) {
		throw new Error(erro.message);
	}
}) 

module.exports = mongoose.model('Base', baseSchema);