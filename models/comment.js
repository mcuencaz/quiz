// Definicion del modelo Comments:

module.exports = function(sequelize, DataTypes) {
	return sequeize.define('Comment',
							{ text: { type: DataTypes.STRING,
									  validate: {notEmpty: {msg: "Falta Comentario"}}
									}
							});
};