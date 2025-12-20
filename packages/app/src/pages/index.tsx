import { NextPage } from 'next';
import { useEffect, useState } from 'react';
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

const QUESTION_LIMITS = [5, 10, 15];

const HomePage: NextPage = () => {
  const [category, setCategory] = useState<Category>('football');
  const [limit, setLimit] = useState(10);

  const [questions, setQuestions] = useState<QuizData[]>(() =>
    shuffle(questionsMap.football).slice(0, limit),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<keyof QuizData['answers'] | null>(
    null,
  );
  const [score, setScore] = useState(0);

  const quiz = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  /* ---------- derived ---------- */

  const progress =
    ((currentIndex + (selected ? 1 : 0)) / questions.length) * 100;

  /* ---------- helpers ---------- */

  const buildQuestions = (cat: Category, lim: number) =>
    shuffle(questionsMap[cat]).slice(0, lim);

  const resetQuiz = (cat = category, lim = limit) => {
    setQuestions(buildQuestions(cat, lim));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
  };

  /* ---------- actions ---------- */

  const handleSelect = (key: keyof QuizData['answers']) => {
    if (selected) return;

    setSelected(key);

    if (key === quiz.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setCurrentIndex((i) => i + 1);
  };

  const handleCategoryChange = (value: Category) => {
    setCategory(value);
    resetQuiz(value, limit);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    resetQuiz(category, value);
  };

  /* ---------- keyboard ---------- */

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, isLastQuestion]);

  /* ---------- ui helpers ---------- */

  const getButtonClass = (key: keyof QuizData['answers']) => {
    if (!selected) return colorClassMap[key];
    if (key === quiz.correct) return 'btn-success';
    if (key === selected) return 'btn-error';
    return 'btn-disabled opacity-50';
  };

  /* ---------- render ---------- */

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body space-y-4">
          {/* Controls */}
          <div className="flex gap-2">
            <select
              className="select select-bordered flex-1"
              value={category}
              onChange={(e) =>
                handleCategoryChange(e.target.value as Category)
              }>
              <option value="colors">🎨 Colors</option>
              <option value="football">⚽ Football</option>
            </select>

            <select
              className="select select-bordered w-24"
              value={limit}
              onChange={(e) => handleLimitChange(Number(e.target.value))}>
              {QUESTION_LIMITS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* Progress */}
          <div className="space-y-1">
            <progress
              className="progress progress-primary w-full"
              value={progress}
              max={100}
            />
            <div className="flex justify-between text-xs opacity-60">
              <span>
                Question {currentIndex + 1} / {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Question */}
          <div className="space-y-1 text-center">
            <h2 className="card-title justify-center text-lg">
              {quiz.question}
            </h2>
          </div>

          {/* Answers */}
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
                <span className="ml-1 opacity-60">
                  ({key[0].toUpperCase()})
                </span>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {selected && (
            <div className="alert">
              {selected === quiz.correct ? (
                <span>✅ Correct answer!</span>
              ) : (
                <span>❌ Wrong answer</span>
              )}
            </div>
          )}

          {/* Next */}
          {selected && !isLastQuestion && (
            <button className="btn btn-primary w-full" onClick={handleNext}>
              Next Question →
            </button>
          )}

          {/* Completed */}
          {selected && isLastQuestion && (
            <div className="space-y-3 text-center">
              <div className="text-lg font-semibold">🎉 Quiz completed!</div>

              <div>
                Score:{' '}
                <span className="font-bold">
                  {score} / {questions.length}
                </span>
              </div>

              <button
                className="btn btn-outline w-full"
                onClick={() => resetQuiz()}>
                🔄 Reset Quiz
              </button>

              <div className="text-xs opacity-60">
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
