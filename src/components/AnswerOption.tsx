
type AnswerOptionProps = {
  letter: string; // A, B, C, D
  text: string;
  isSelected: boolean;
  isCorrect: boolean | null;
  disabled: boolean;
  onSelect: () => void;
};

export default function AnswerOption({ 
  letter,
  text, 
  isSelected, 
  isCorrect, 
  disabled, 
  onSelect 
}: AnswerOptionProps) {
  let className = "answer-btn";
  if (isSelected && isCorrect === true) className += " correct";
  if (isSelected && isCorrect === false) className += " wrong";

  return (
    <button
      className={className}
      onClick={onSelect}
      disabled={disabled}
    >
      <span className="option-letter">{letter}.</span> {text}
    </button>
  );
}
