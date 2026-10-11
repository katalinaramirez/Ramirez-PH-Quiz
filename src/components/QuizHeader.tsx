type QuizHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function QuizHeader({ title, subtitle }: QuizHeaderProps) {
  return (
    <div className="quiz-header">
        <span className="header-icon">🦅</span>
      <h1>Something about the Philippines Quiz</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}