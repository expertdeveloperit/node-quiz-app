// Question Controllers

// Model
import questionsModel from '../models/questions';

// initialize variables 
var questions = [],
    answers = [],
    i = 0;

module.exports = {

 // Get All Questions
    getQuestions(req,res,next){
		questionsModel.aggregate([{$sample: {size: 10}}])
		    .then(data => {
		    	if(data.length) {
                   questions = data;
   					answers = [];
		    	   res.render('quiz',{question:questions[0].question,options:questions[0].options});
		    	} else {
		    		res.render('404');
		    	}
		    })
		    .catch(err => {
		    	res.render('500');
		    });
	  },

 /* 
   * Render Next Question of the quiz 
   * match the  answers user selected and the correct answers
 */
	  nextQuestion(req,res,next){
	  	console.log("questions", questions);
		i = i + 1;
	    if(req.body.optradio){
	    	if(i <= questions.length) {
	    		answers.push(req.body.optradio);
	    	}
	 	    if(i < questions.length){
	        res.render('quiz',{question:questions[i].question,options:questions[i].options});
	 	    } else {
	 	    	i=0;
	 	    	var score = 0;
	 	    	for(let j = 0 ; j < questions.length; j++) {
	 	    		 if(questions[j].answer == answers[j])
	 	    		 {
	 	    		 	score = score + 1;
	 	    		 }
	 	    	} 
	 	    	res.render('score',{score:score,total:questions.length})
	 	    }
	    } 
	  },
	  
 // add  Questions for the quiz in database
	  addQuestions(req,res,next){

	  	var question = req.body.question,
	  	    options  = req.body.options,
	  	    answer = req.body.answer;

	  	var newQuiz = new questionsModel({
	  		question,
			options,
			answer
	  	});
	  	newQuiz.save()
		    .then(data => {
		    	if(data) {
		    		res.status(200).json({
		    			data
		    		})
		    	} else {
		    		res.send("no data dound")
		    	}
		    })
		    .catch(err => {
		    	console.log("error",err);
		    })
	  }
}
