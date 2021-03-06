$(document).ready(function() {
	quizIntro();

	function quizIntro() {
		$('.t1').fadeIn(2000, function() {
			$(this).fadeOut(2000, function() {
				$('.t2').css('margin-top', '2em').fadeIn(2000, function() {
					$(this).fadeOut(2000, function() {
						$('.t3').css('margin-top', '4em').fadeIn(2000, function() {
							$(this).fadeOut(2000, function() {
								$('.main-title').css('margin-top', '1em').fadeIn(2000);
								$('.quizButton').fadeIn(2000);
								$('h6').delay(2000).fadeIn(2000);
							});
						});
					});
				});
			});
		});
	}

	// Display quizContent modal box
	$(".quizButton").click(function() {
		$(".quizContent").fadeIn(1000);
		$('#container').fadeOut(1000);
	});

	// Quiz Question Array
	var questions = [{
		question: "Where was Jean-Michel Baquiat born?",
		choices: ["Sacramento, CA", "Boston, MA", "Brooklyn, NY", "Kauai, HI"],
		questionNumber: 0,
		correctChoice: 2,
		fact: "Answer: Brooklyn, NY <br> He was the 2nd of 4 children, born to Maltilda Andrades & Gerard Basquiat."
		},
		{
		question: "What famous singer did Basquiat date?",
		choices: ["Whitney Houston", "Madonna", "Cyndi Lauper", "Vanity"],
		questionNumber: 1,
		correctChoice: 1,
		fact: "Answer: Madonna <br> They had an affair and eventually dated."
		},
		{
		question: "What artist did Basquiat do a collaboration with?",
		choices: ["Keith Haring", "Andy Warhol", "Eric Fischl", "Banksy"],
		questionNumber: 2,
		correctChoice: 1,
		fact: "Answer: Andy Warhol <br> They collaborated in 1984."
		},
		{
		question: "What is the most common name for Basquiat's genre of art?",
		choices: ["Graffiti", "Contemporary Art", "Neo-Expressionism", "Primitivism"],
		questionNumber: 3,
		correctChoice: 2,
		fact: "Answer: Neo-Expressionism <br> He was considered a pioneer in this genre."
		},
		{
		question: "What was Jean-Michel's nickname?",
		choices: ["Samo", "Jean", "King", "Radiant Child"],
		questionNumber: 4,
		correctChoice: 0,
		fact: "Answer: Samo <br> He came up with this name with his friend Al Diaz."
		}
	];

	// Defining Global Variables
	var numberCorrect = 0;
	var currentQuestion = 0;

	// Allowing the Submit Button to take you to the next question
	$(".quizContent").on("click", "#submit", function() {
		if ($("input[type='radio']:checked").val()) {
			updateScore();
			currentQuestion++;
			nextQuestion();
		}
		else {
			alert("You must select an answer!");
		}
	});

	// Allows you to take the quiz over again
	$(".quizContent").on("click", "#retryButton", function() {
		numberCorrect = 0;
		currentQuestion = 0;
		var newQuestion = '<span class="question">' + questions[currentQuestion].question + '</span><div class="multipleChoiceAnswers"><input type="radio" name="option" class="option" value="0"><span class="answer">' + questions[currentQuestion].choices[0] + '</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">' + questions[currentQuestion].choices[1] + '</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">' + questions[currentQuestion].choices[2] + '</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">' + questions[currentQuestion].choices[3] + '</span><br></div><div class="answerButtons"><input type="button" id="submit" value="Submit"><input type="button" id="retryButton" value="Re-Take"></div>';
		$(".quizContent").html(newQuestion);
		$("#lastQuestionFact").html("");
	});

	function updateScore() {
		var answer = $("input[type='radio']:checked").val();
		if (answer == questions[currentQuestion].correctChoice) {
			numberCorrect++;
			$('#correct').fadeIn(2000, function() {
				$(this).delay(2000).fadeOut(2000);
			});
		}
		else {
			$('#incorrect').fadeIn(2000, function() {
				$(this).delay(2000).fadeOut(2000);
			});
		}
	}

	function nextQuestion() {
		var newQuestion, finalScore;
		if (currentQuestion < 5) {
			$(".question").remove();
			$(".multipleChoiceAnswers input").remove();
			$(".multipleChoiceAnswers .answer").remove();
			$("#lastQuestionFact").hide();
			newQuestion = '<span class="question">' + questions[currentQuestion].question + '</span><div class="multipleChoiceAnswers"><input type="radio" name="option" class="option" value="0"><span class="answer">' + questions[currentQuestion].choices[0] + '</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">' + questions[currentQuestion].choices[1] + '</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">' + questions[currentQuestion].choices[2] + '</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">' + questions[currentQuestion].choices[3] + '</span><br></div><div class="answerButtons"><input type="button" id="submit" value="Submit"><input type="button" id="retryButton" value="Re-Take"></div>';
			$(".quizContent").html(newQuestion);
			var lastFact = questions[currentQuestion-1].fact;
            $("#lastQuestionFact").html(lastFact).fadeIn(2000);
		}
		else {
			$(".question").remove();
			$(".multipleChoiceAnswers input").remove();
			$(".multipleChoiceAnswers .answer").remove();
			$("#lastQuestionFact").hide();
			$("#lastQuestionFact").fadeIn(2000);
			$("#submit").css("display", "none");
			$("#retryButton").css("display", "inline");
			var lastFact= questions[currentQuestion-1].fact;
            $("#lastQuestionFact").html(lastFact);
			if (numberCorrect == 1) {
				finalScore = '<div class="final">Congrats on finishing the quiz! You correctly answered ' + numberCorrect + ' question!</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
			else if (numberCorrect > 1 && numberCorrect < 5) {
				finalScore = '<div class="final">Congrats on finishing the quiz! You correctly answered ' + numberCorrect + ' questions!</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
			else if (numberCorrect == 5) {
				finalScore = '<div class="final">You seem to know lots about the icon Jean-Michel Basquiat! Congrats on finishing the quiz! You correctly answered all ' + numberCorrect + ' questions!</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
			else {
				finalScore = '<div class="final">Yikes maybe you should check out the Radiant Child documentary... you didnt get any right..</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
		}
	}
});