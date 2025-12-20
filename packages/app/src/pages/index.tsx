import { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import colorsQuestions from '@quiz/data/questions/colors.json';
import footballQuestions from '@quiz/data/questions/football.json';
import { shuffle } from '@quiz/utils/array';

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

type Category = 'colors' | 'football';

const questionsMap: Record<Category, QuizData[]> = {
  colors: colorsQuestions as QuizData[],
  football: footballQuestions as QuizData[],
};

const colorClassMap: Record<keyof QuizData['answers'], string> = {
  red: 'btn-error',
  yellow: 'btn-warning',
  blue: 'btn-info',
  green: 'btn-success',
};

const HomePage: NextPage = () => {
  const [category, setCategory] = useState<Category>('football');
  const [questions, setQuestions] = useState<QuizData[]>(
    shuffle(questionsMap['football']),
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<keyof QuizData['answers'] | null>(
    null,
  );
  const [score, setScore] = useState(0);

  const quiz = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleSelect = useCallback(
    (key: keyof QuizData['answers']) => {
      if (selected) return;

      setSelected(key);

      if (key === quiz.correct) {
        setScore((s) => s + 1);
      }
    },
    [selected, quiz.correct],
  );

  const handleNext = () => {
    setSelected(null);
    setCurrentIndex((i) => i + 1);
  };

  const handleCategoryChange = (value: Category) => {
    setCategory(value);
    setQuestions(shuffle(questionsMap[value]));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return;

      if (!selected) {
        if (e.key === 'r') handleSelect('red');
        if (e.key === 'y') handleSelect('yellow');
        if (e.key === 'b') handleSelect('blue');
        if (e.key === 'g') handleSelect('green');
      }

      if (selected && e.key === 'ArrowRight' && !isLastQuestion) {
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selected, handleSelect, isLastQuestion]);

  const getButtonClass = (key: keyof QuizData['answers']) => {
    if (!selected) return colorClassMap[key];
    if (key === quiz.correct) return 'btn-success';
    if (key === selected) return 'btn-error';
    return 'btn-disabled opacity-50';
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
            <option value="football">⚽ Football</option>
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
                {quiz.answers[key]}{' '}
                <span className="opacity-60">({key[0].toUpperCase()})</span>
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

          {selected && !isLastQuestion && (
            <button
              className="btn btn-primary mt-2 w-full"
              onClick={handleNext}>
              Next Question →
            </button>
          )}

          {selected && isLastQuestion && (
            <div className="mt-4 space-y-2 text-center">
              <div className="text-lg font-semibold">🎉 Quiz completed!</div>
              <div>
                Score:{' '}
                <span className="font-bold">
                  {score} / {questions.length}
                </span>
              </div>
              <div className="text-sm opacity-60">
                Keyboard: R Y B G • → Next
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
