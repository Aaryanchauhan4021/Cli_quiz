const readlineSync = require("readline-sync");


let questions = [
  {
    id: 1,
    text: "What is the capital of France?",
    correctAnswer: "Paris",
    incorrectAnswers: ["London", "Berlin", "Madrid"],
    difficulty: "Easy",
    hint: "It's known as the 'City of Light'."
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    correctAnswer: "Mars",
    incorrectAnswers: ["Venus", "Jupiter", "Saturn"],
    difficulty: "Medium",
    hint: "It's named after the Roman god of war."
  },
  {
    id: 3,
    text: "Which is the cold planet?",
    correctAnswer: "venus",
    incorrectAnswers: ["Venus", "Jupiter", "Saturn"],
    difficulty: "Medium",
    hint: "It's named is the cold planet."
  }
];

let highScores = [];

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function playQuiz() {
  let score = 0;

  let shuffledQuestions = shuffleArray(questions);

  console.log("\n=== Quiz Started ===");
  shuffledQuestions.forEach((q, index) => {
    let options = shuffleArray([q.correctAnswer, ...q.incorrectAnswers]);
    console.log(`\nQuestion ${index + 1}: ${q.text}`);
    
    options.forEach((opt, i) => console.log(`${i + 1}. ${opt}`));

    let userAnswer = readlineSync.questionInt("Enter your answer (1-4) or 0 for a hint: ");

    if (userAnswer === 0) {
      console.log("hint chahiye dosto:", q.hint);
      score -= 5; 
      userAnswer = readlineSync.questionInt("enter your answer (1-4): ");
    }

    if (options[userAnswer - 1] === q.correctAnswer) {
      console.log(" Correct +10 points.");
      score += 10;
    } else {
      console.log(` wrong! The correct answer is: ${q.correctAnswer}`);
    }
  });

  console.log(`\n Quiz completed! Your final score: ${score} points.`);
  
  let playerName = readlineSync.question("Enter your name for the leaderboard: ");
  highScores.push({ name: playerName, score} );
  highScores.sort((a, b) => b.score - a.score);
}

function addQuestion() {
  let newId = questions.length + 1;
  let text = readlineSync.question("Enter Question Text: ");
  let correctAnswer = readlineSync.question("Enter Correct Answer: ");
  let incorrectAnswers = readlineSync.question("Enter Incorrect Answers (comma-separated): ").split(",");
  let difficulty = readlineSync.question("Enter Difficulty Level (Easy, Medium, Hard): ");
  let hint = readlineSync.question("Enter Hint (optional): ");

  questions.push({ id: newId, text, correctAnswer, incorrectAnswers, difficulty, hint });
  console.log(" Question added successfully!");
}

function viewQuestions() {
  console.log("\n=== Question List ===");
  questions.forEach(q =>
    console.log(`${q.id}. ${q.text} - Difficulty: ${q.difficulty}, Correct Answer: ${q.correctAnswer}`)
  );
}

function deleteQuestion() {
  viewQuestions();
  let deleteId = readlineSync.questionInt("enter delete by id ");
  let index = questions.findIndex(q => q.id === deleteId);
  console.log(index);
  
  
  if (index !== -1) {
    console.log(` Question "${questions[index].text}" deleted successfully!`);
    questions.splice(index, 1);
  } else {
    console.log(" Invalid Question ID!");
  }
}

function viewHighScores() {
  console.log("\n=== High Scores ===");

  
  highScores.forEach((item, index) => console.log(`${index + 1}. ${item.name} - ${item.score} points`));
}

// while (true) {
  console.log("\n=== Quiz Game ===");
  console.log("1. Play Quiz");
  console.log("2. Add a Question");
  console.log("3. View All Questions");
  console.log("4. Delete a Question");
  console.log("5. View High Scores");
  console.log("6. Exit");

  let choice = readlineSync.questionInt("Enter your choice (1-6): ");

  switch (choice) {
    case 1:
      playQuiz();
      break;
    case 2:
      addQuestion();
      break;
    case 3:
      viewQuestions();
      break;
    case 4:
      deleteQuestion();
      break;
    case 5:
      viewHighScores();
      break;
    case 6:
      console.log("Exit Thank you for playing!");
      process.exit();
    default:
      console.log(" not choice! Please enter a number between 1-6.");
  }
