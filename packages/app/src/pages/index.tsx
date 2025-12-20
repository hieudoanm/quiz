import { NextPage } from 'next';
import { useState } from 'react';
import colorsQuestions from '@quiz/data/questions/colors.json';

type QuizData = {
  question: string;
  answers: {
    red: string;
    yellow: string;
    blue: string;
    green: string;
  };
  correct: 'red' | 'yellow' | 'blue' | 'green';
};

type Category = 'colors';

const questionsMap: Record<Category, QuizData[]> = {
  colors: colorsQuestions as QuizData[],
};

const colorClassMap: Record<keyof QuizData['answers'], string> = {
  red: 'btn-error',
  yellow: 'btn-warning',
  blue: 'btn-info',
  green: 'btn-success',
};

const HomePage: NextPage = () => {
  const [category, setCategory] = useState<Category>('colors');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<keyof QuizData['answers'] | null>(
    null,
  );

  const questions = questionsMap[category];
  const quiz = questions[currentIndex];

  const handleSelect = (key: keyof QuizData['answers']) => {
    if (selected) return;
    setSelected(key);
  };

  const getButtonClass = (key: keyof QuizData['answers']) => {
    if (!selected) return colorClassMap[key];
    if (key === quiz.correct) return 'btn-success';
    if (key === selected) return 'btn-error';
    return 'btn-disabled opacity-50';
  };

  const handleNext = () => {
    setSelected(null);
    setCurrentIndex((i) => i + 1);
  };

  const handleCategoryChange = (value: Category) => {
    setCategory(value);
    setCurrentIndex(0);
    setSelected(null);
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body space-y-4">
          {/* Category selector */}
          <select
            className="select select-bordered w-full"
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as Category)}>
            <option value="colors">🎨 Colors</option>
          </select>

          <h2 className="card-title text-center text-lg">{quiz.question}</h2>

          <div className="grid grid-cols-2 gap-3">
            {(
              Object.keys(quiz.answers) as Array<keyof QuizData['answers']>
            ).map((key) => (
              <button
                key={key}
                disabled={
                  !!selected && key !== quiz.correct && key !== selected
                }
                className={`btn h-20 text-white transition-all ${getButtonClass(
                  key,
                )}`}
                onClick={() => handleSelect(key)}>
                {quiz.answers[key]}
              </button>
            ))}
          </div>

          {selected && (
            <div className="alert">
              {selected === quiz.correct ? (
                <span>✅ Correct answer!</span>
              ) : (
                <span>❌ Wrong answer</span>
              )}
            </div>
          )}

          {selected && currentIndex < questions.length - 1 && (
            <button
              className="btn btn-primary mt-2 w-full"
              onClick={handleNext}>
              Next Question →
            </button>
          )}

          {selected && currentIndex === questions.length - 1 && (
            <div className="mt-2 text-center font-semibold">
              🎉 Quiz completed!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
