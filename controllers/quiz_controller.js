
var models = require('../models');

// Autoload el quiz asociado a :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(function(quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error) {next(error);});
};




// Get /quizzes
exports.index = function(req, res, next) {
	
var search = req.query.search || '';
		
		if (search){

			search = search.replace(' ', '%');

			models.Quiz.findAll({where: { question: { $like: '%'+search+'%' }}}).then(function(quizzes) { 

			res.render('quizzes/index.ejs', { quizzes: quizzes});

		}).catch(function(error) { next(error); });


		}else {

	models.Quiz.findAll().then(function(quizzes) {
			
			res.render('quizzes/index.ejs', { quizzes: quizzes});
		
	}).catch(function(error) { next(error); });
}};




// Get /quizzes/:id
exports.show = function(req, res, next) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		if (quiz) {
			var answer = req.query.answer || '';
			res.render('quizzes/show', {quiz: req.quiz, answer: answer});
		} else { throw new Error('No existe ese quiz en la BBDD.'); }
	}).catch(function(error) { next(error); });
};

// Get /quizzes/:id/check
exports.check = function(req, res) {
	models.Quiz.findById(req.params.quizId).then(function(quiz) {
		if (quiz) {
			var answer = req.query.answer || '';
			var result = answer === req.quiz.answer ? 'Correcta' : 'Incorrecta';
			res.render('quizzes/result', {quiz: req.quiz, result: result, answer: answer});
		} else { throw new Error('No existe ese quiz en la BBDD.'); }
	}).catch(function(error) { next(error); });
};



// get quizzes/new
exports.new = function(req, res, next) {
var quiz = models.Quiz.build({question: "", answer: ""});
res.render('quizzes/new', {quiz: quiz});

};


//Post /quizzes/create
 exports.create = function(req, res, next) {
 	var quiz = models.Quiz.build({ question: req.body.quiz.question,
 								   answer: req.body.quiz.answer});

 	// guarda en DB los campos pregunta y respuesta de quiz
 	quiz.save({fields: ["question", "answer"]}).then(function(quiz){
 		req.flash('success', 'Quiz creado con éxito.');
 		res.redirect('/quizzes'); //res redirect: Redirección HTTP a la lista de preguntas
 	}).catch(function(error) {
 		req.flash('error', 'Error al crear un Quiz: '+error.message);
 		next(error);
 	});
 };



// Get Author
exports.author = function(req, res, next) {
	res.render('quizzes/author',{});
};


