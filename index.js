'use strict'

// this variable is for incrementing the question number
let questionNumber = 0
let score = 0

function generateNewQuestion(){
  console.log('generating new questions');
  console.log(`current question number is: ${questionNumber}`);

  if (questionNumber < STORE.length){
    return `
    <div class="question-number-${questionNumber}">
    <h3 class="question-title">${STORE[questionNumber].question}</h3>
    <form class="form-question">
      <fieldset>
        <label>
        <input class="input-radio" type="radio" name="choices" value="${STORE[questionNumber].choice[0]}" required><span>${STORE[questionNumber].choice[0]}</span>
        </label>    
        <br>
        <label>
        <input class="input-radio" type="radio" name="choices" value="${STORE[questionNumber].choice[1]}"><span>${STORE[questionNumber].choice[1]}</span>
        </label>    
        <br>
        <label>
        <input class="input-radio" type="radio" name="choices" value="${STORE[questionNumber].choice[2]}"><span>${STORE[questionNumber].choice[2]}</span>
        </label>    
        <br>
        <label>
        <input class="input-radio" type="radio" name="choices" value="${STORE[questionNumber].choice[3]}"><span>${STORE[questionNumber].choice[3]}</span>
        </label>   
        <button class="js-submit-button">Submit</button>
      </fieldset>
  </form>
  </div>`;
  } else {
    renderResult();
    restartQuiz();
  }
}

function increaseQuestionNumber() {
  console.log(questionNumber);
  questionNumber++;
  $('.userOnQuestion').text(questionNumber+1);
  console.log(questionNumber+1);
  
}

function increaseScore(){
  score++;
}

function beginQuiz(){
  //questions should appear when user click start/next
  $('.js-start-quiz').on('click','.js-start-button', function(event){
    console.log('handleQuestions ran');
    $('.js-start-quiz').remove();
    $('.quiz-form').css('display','block');
    $('.userOnQuestion').text(1);
  })
}

function renderQuestion(){
  console.log('rendering the questions')
  $('.quiz-form').html(generateNewQuestion());
}

function answerSelected(){
  $('form').on('submit', function(event){
    // event.preventDefault();

    let radioValue = $("input[name='choices']:checked").val();
    console.log(radioValue);
    let correctAnswer = `${STORE[questionNumber].answer}`;

    if (radioValue === correctAnswer){
      console.log('You are correct!')
      ifCorrectAnswer();

    } else {
      console.log('you are wrong!')
      ifWrongAnswer();
    }
  });
}

function ifCorrectAnswer(){
  feedbackCorrectAnswer();
  increaseScore();
  console.log('Your score is:' + score)
  $('.userScore').text(score)
}

function ifWrongAnswer(){
  feedbackWrongAnswer();
}

function feedbackCorrectAnswer(){
  let correctAnswer = `${STORE[questionNumber].answer}`;
  $(`.question-number-${questionNumber}`).remove()
  $('.quiz-form').html(`<div class="col-12 feedback">
  <img class="feedback-sign" src="./img/tick-sign.jpg" alt="a tick sign">
  <p>You are correct! The answer is <span class="feedback-answer">${correctAnswer}</span></p><button class="next-button">Next</button>
</div>`)
}

function feedbackWrongAnswer(){
  let correctAnswer = `${STORE[questionNumber].answer}`;
  $(`.question-number-${questionNumber}`).remove()
  $('.quiz-form').html(`<div class="col-12 feedback">
  <img class="feedback-sign" src="./img/wrong-sign.jpg" alt="a wrong sign">
  <p>You are wrong! The answer is <span class="feedback-answer">${correctAnswer}</span></p><button class="next-button">Next</button>
  </div>`)
}

function renderNextQuestion(){
  $('.main-box').on('click', '.next-button', function(event) {
    increaseQuestionNumber();
    renderQuestion();
    answerSelected();
  });
}

function renderResult(){
  $(`.question-number-${questionNumber}`).remove()
  $('.js-info-item').remove()

  if (score >= 8) {
    $('.quiz-form').html(resultPassed());
  } else if (score < 8){
    $('.quiz-form').html(resultFailed());
  }

}

function resultPassed() {
  return `<p class="result-text">Congratulations! You are a true JavaScript Programmer!</p>
  <p> You're final score is ${score} </p>
  <button class="retry">Brag Again?</button>  
  `;
}

function resultFailed() {
  return `<p class="result-text">Uh oh! Better stick to the basics</p>
  <p> You had a low score of ${score} </p>
  <button class="retry">Try Again?</button>
  `
}

function restartQuiz(){
  $('main').on('click','.retry', function(event){
    location.reload();
  });
}





function startQuiz(){
  beginQuiz();
  renderQuestion();
  answerSelected();
  renderNextQuestion();
}

$(startQuiz);