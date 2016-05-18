var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Autoload de rutas que usen :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('userId', userController.load);  // autoload :userId

// Definicion de rutas de /quizzes
router.get('/quizzes.:format?', quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?', quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
router.get('/quizzes/new', quizController.new);
router.post('/quizzes', quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', sessionController.loginRequired,
										  quizController.ownershipRequired, quizController.edit);
router.put('/quizzes/:quizId(\\d+)', sessionController.loginRequired,
									quizController.ownershipRequired, quizController.update);
router.delete('/quizzes/:quizId(\\d+)', sessionController.loginRequired,
										quizController.ownershipRequired, quizController.destroy);

// comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new', sessionController.loginRequired, commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments', sessionController.loginRequired, commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept', sessionController.loginRequired,
																	  quizController.ownershipRequired, commentController.accept);


// Definicion de rutas de cuenta
router.get('/users',					userController.index);
router.get('/users/:userId(\\d+)',		userController.show);
router.get('/users/new',				userController.new);
router.post('/users',					userController.create);
router.get('/users/:userId(\\d+)/edit',	sessionController.loginRequired, 
										userController.adminOrMyselfRequired,	userController.edit);
router.put('/users/:userId(\\d+)',		sessionController.loginRequired,
										userController.adminOrMyselfRequired,	userController.update);
router.delete('/users/:userId(\\d+)',	sessionController.loginRequired,
										userController.adminAndNotMyselfRequired,	userController.destroy);

// Autoload de parametros
router.param('quizId', quizController.load); // autooad :quizId
router.param('userId', userController.load); // autoload userId
router.param('commentId', commentController.load); //autoload :commentId


// Definición de rutas de sesión: 
router.get('/session', 			sessionController.new);   //formulario login
router.post('/session', 			sessionController.create);	// crear sesion
router.delete('/session', 			sessionController.destroy); // destruir sesion



// GET creditos
router.get('/author', quizController.author);


// router.get('/question', quizController.question);
// router.get('/check', quizController.check);

module.exports = router;
