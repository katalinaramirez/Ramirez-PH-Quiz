
import AnswerOption from './AnswerOption';
import ProgressBar from './ProgressBar';
import { questions } from '../questions';
import type { Question } from '../types';

type QuestionCardProps = {
  question: Question;
  currentNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  answers: (number | null)[];
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
};

export default function QuestionCard({
  question,
  currentNumber,
  totalQuestions,
  selectedAnswer,
  answers,
  onSelectAnswer,
  onNext
}: QuestionCardProps) {
  return (
    <div className="question-card">
      {/* Status Bar */}
      <div className="answers-status">
        {Array.from({ length: totalQuestions }).map((_, index) => {
          const ans = answers[index];
          const isCurrent = index + 1 === currentNumber;
          
          let symbol = '_';
          let statusClass = 'empty';
          
          if (ans !== null) {
            const q = questions.find(q => q.id === index + 1);
            if (q && ans === q.correctAnswer) {
              symbol = '☑';
              statusClass = 'correct';
            } else {
              symbol = '✗';
              statusClass = 'wrong';
            }
          }
          
          return (
            <span key={index} className={`status-item ${statusClass} ${isCurrent ? 'current' : ''}`}>
              {symbol}
            </span>
          );
        })}
      </div>

      <ProgressBar current={currentNumber} total={totalQuestions} />
      
      <p className="choose-text">Choose the best answer:</p>
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => {
          const letters = ['A', 'B', 'C', 'D'];
          return (
            <AnswerOption
              key={index}
              letter={letters[index]}
              text={option}
              isSelected={selectedAnswer === index}
              isCorrect={selectedAnswer !== null ? index === question.correctAnswer : null}
              disabled={selectedAnswer !== null}
              onSelect={() => onSelectAnswer(index)}
            />
          );
        })}
      </div>
      
      <div className="next-btn-container">
        <button className="next-btn" onClick={onNext}>
          {currentNumber === totalQuestions ? 'Finish Attempt' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
}



