var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite: 
// DATABASE_URL = sqlite:///
// DATABASE_STORAGE = quiz.sqlite
/// Usar BBDD postgres:
// DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if(!process.env.DATABASE_URL) {
	url = "sqlite:///";
	storage = "quiz.sqlite";
} else {
	url = process.env.DATABASE_URL;
	storage = process.env.DATABASE_STORAGE || "";
}


var sequelize = new Sequelize(url,
							 { storage: storage,
							   omitNull: true
							 });

// Importar la definicion de la tabla QUiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

var Comment = sequelize.import(path.join(__dirname, 'comment'));

var User = sequelize.import(path.join(__dirname, 'user'));

var Attachment = sequelize.import(path.join(__dirname, 'attachment'));



//Relaciones entre modelos:
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

// Relacion 1 a N entre User y QUiz: 
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});


// Relacion 1-a-1 entre Quiz y Attachment
Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);


	// // sequelize.sync() crea e inicializa tabla de preguntas en DB
	// sequelize.sync()
	// .then(function() { // sunc() crea la tabla quiz
	//   return Quiz.count().then(function (c) {
	// 		if(c === 0) { //la tabla se iniciualiza si esta vacia
	// 			return Quiz.bulkCreate([ { question: 'Capital de Italia', answer: 'Roma' },
	// 									 { question: 'Capital de Portugal', answer: 'Lisboa'}
	// 									 ]).then(function() {
	// 				console.log('Base de datos inicializada con datos');
	// 			});

	// 		}
	// 		});
	// }).catch(function(error) {
	// 	console.log("Error Sincronizando las tablas de la BBDD:", error);
	// 	process.exit(1);
	// });

exports.Quiz = Quiz; //exportar definicion de la tabla Quiz.	
exports.Comment = Comment;
exports.User = User;
exports.Attachment = Attachment;