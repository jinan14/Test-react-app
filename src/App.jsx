import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const quesArray = [
    {
      question: 'Which is the biggest country in the world in terms of area?',
      options: ['Russia', 'United States', 'China'],
      answer: 'Russia',
      imageArray: ['src/assets/good-morning-moscow.webp', 'src/assets/st-basils-cathedral.webp']
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Madrid'],
      answer: 'Paris',
      imageArray: ['src/assets/eiffel-tower.webp', 'src/assets/arc-de-triomphe-at-sunrise-paris-france.webp']
    },
    {
      question: 'Which Football Club is based in Madrid and have a great reputation?',
      options: ['Valencia', 'Barcalona', 'Real Madrid'],
      answer: 'Real Madrid',
      imageArray: ['src/assets/santiago-benabeu.webp', 'src/assets/zidane.jpg']
    },
    {
      question: 'Who is known for hits like "Blank Space", "Love Story", "Shake it Off"?',
      options: ['Miley Cyrus', 'Taylor Swift', 'Ariana Grande'],
      answer: 'Taylor Swift',
      imageArray: ['src/assets/taylor.jpeg', 'src/assets/swift.jpeg']
    },
    {
      question: 'which city was destroyed and rebuilt 7 times?',
      options: ['Beirut', 'Cairo', 'Gaza'],
      answer: 'Beirut',
      imageArray: ['src/assets/beirut.webp', 'src/assets/beirut-lebanon.webp']
    }
  ];

  const [count, setCount] = useState(0); //index of the quesArray 
  const [score, setScore] = useState(0); // score counter initially set 0
  const [imageIndex, setImageIndex] = useState(0); // index of the image in the imageArray of the current object
  const [username, setUsername] = useState(''); // username input field
  const [started, setStarted] = useState(false); // flag to check if the quiz has started

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    const correct = answer === quesArray[count].answer; // true or false 
    setIsCorrect(correct);

    if (correct) {
      if(count !== quesArray.length - 1){
        setScore(score + 1);
      } else {
        setScore(score + 1);
        setTimeout(() => {
          alert('Congratulations! You finished all the questions. Your score is: ' + (score + 1));
          handleNextQuestion();
        }, 800);
      }
    }

    setTimeout(() => {
      if (count < quesArray.length - 1) {
        setCount(count + 1);
      }
      setImageIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }, 800);
  };

  const handleNextQuestion = () => {
      setCount(0);
      setScore(0);
    setImageIndex(0);
  };

  const moveLeft = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(quesArray[count].imageArray.length - 1);
    }
  };

  const moveRight = () => {
    if (imageIndex < quesArray[count].imageArray.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className='container'>
      {started ? (
        <>
          <h1>Welcome, {username}!</h1>
          <p>Please answer the following questions:</p>

          <div className="test">

            <div className='carousel'>

              <button className='left' onClick={moveLeft}>left</button>

                <img src={quesArray[count].imageArray[imageIndex]} alt="Hint Image" />
              
              <button className='right' onClick={moveRight}>right</button>

            </div>

            <p>{quesArray[count].question}</p>

            {quesArray[count].options.map((option, index) => (
              <button
                className={`answer ${selectedAnswer === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}

            <button className='next' onClick={handleNextQuestion}>Reset</button>
            <h2>Score: {score}/{quesArray.length}</h2>
          </div>
        </>
      ) : (
        <>
          <h1>Welcome to the Quiz App!</h1>
          <p>Please enter your username to start:</p>
          <input
          className='input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button className='start' onClick={username != ''? handleStart : ''}>Start</button>
        </>
      )}
    </div>
  );
}

export default App;