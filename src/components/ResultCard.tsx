type ResultCardProps = {
  score: number;
  total: number;
  onRetake: () => void;
  onHome: () => void;
};

export default function ResultCard({ score, total, onRetake, onHome }: ResultCardProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 60;

  return (
    <div className="result-card">
      <h1 className="result-title">{passed ? '🎉 Congratulations!' : '📝 Quiz Complete!'}</h1>
      <p className="result-score">Your Score: {score} / {total}</p>
      <p className="result-percent">{percentage}%</p>
      
      <div className="result-buttons">
        <button className="home-btn" onClick={onHome}>Return Home</button>
        {!passed && (
          <button className="retake-btn" onClick={onRetake}>Retake Quiz</button>
        )}
      </div>
    </div>
  );
}