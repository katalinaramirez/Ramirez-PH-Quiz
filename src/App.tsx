import { useState } from 'react';
import QuizHeader from './components/QuizHeader';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import { questions } from './questions';
import type { Question } from './types';
import './App.css';

type Screen = 'home' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [currentId, setCurrentId] = useState(1);
  const [score, setScore] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const total = questions.length;
  const [answers, setAnswers] = useState<(number | null)[]>(Array(total).fill(null));

  const currentQuestion: Question | undefined = questions.find(q => q.id === currentId);

  const startQuiz = () => {
    setScreen('quiz');
    setCurrentId(1);
    setScore(0);
    setSelectedIndex(null);
    setAnswers(Array(total).fill(null));
  };

  const selectAnswer = (index: number) => {
    if (selectedIndex !== null || !currentQuestion) return;
    setSelectedIndex(index);
    const newAnswers = [...answers];
    newAnswers[currentId - 1] = index;
    setAnswers(newAnswers);
    if (index === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const goToNext = () => {
    if (currentId < total) {
      setCurrentId(prev => prev + 1);
      setSelectedIndex(answers[currentId] ?? null);
    } else {
      setScreen('result');
    }
  };

  const retakeQuiz = () => {
    setScreen('quiz');
    setCurrentId(1);
    setScore(0);
    setSelectedIndex(null);
    setAnswers(Array(total).fill(null));
  };

  const goHome = () => {
    setScreen('home');
  };

  if (screen === 'home') {
    return (
      <div className="page-wrapper home-page">
        <div className="home-container">
          <QuizHeader 
            title=" Something about Philippines Quiz" 
            subtitle="You know philippines well? Let's find out! " 
          />
          <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (screen === 'result') {
    return (
      <div className="page-wrapper result-page">
        <ResultCard
          score={score}
          total={total}
          onRetake={retakeQuiz}
          onHome={goHome}
        />
      </div>
    );
  }

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="page-wrapper quiz-page">
      <div className="quiz-container">
        <QuestionCard
          question={currentQuestion}
          currentNumber={currentId}
          totalQuestions={total}
          selectedAnswer={selectedIndex}
          answers={answers}
          onSelectAnswer={selectAnswer}
          onNext={goToNext}
        />
      </div>
    </div>
  );
}