// Dependencies
import express from 'express';
const routerQuiz = express.Router();

//controller
import  questionController from '../controllers/questionController' ;


// Quiz API Routes (/quiz)
routerQuiz.get('/', questionController.getQuestions);

// Quiz API Routes (/quiz/add)
routerQuiz.post('/add', questionController.addQuestions);

// Quiz API Routes (/quiz/next)
routerQuiz.post('/next', questionController.nextQuestion);

// Export this Module
module.exports = routerQuiz;
