import { Audience } from '@quiz/components/Audience';
import { Feature } from '@quiz/components/Feature';
import { Navbar } from '@quiz/components/Navbar';
import { Step } from '@quiz/components/Step';
import { NextPage } from 'next';
import Link from 'next/link';

const LandingPage: NextPage = () => {
  return (
    <main className="bg-base-100 text-base-content min-h-screen">
      <Navbar />

      {/* 1️⃣ Hero */}
      <section className="px-6 py-24 text-center">
        <h1 className="mb-6 text-4xl font-bold md:text-6xl">
          Play. Create. Share Quizzes.
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg opacity-80 md:text-xl">
          A fast, simple quiz platform for learning, fun, and friendly
          competition.
        </p>

        <Link href="/play" className="btn btn-primary btn-lg">
          ▶️ Play Now
        </Link>
      </section>

      <div className="divider opacity-30" />

      {/* 2️⃣ How It Works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>

        <div className="grid gap-8 text-center md:grid-cols-3">
          <Step
            title="Choose a Quiz"
            description="Pick from sports, languages, history, geography, and more."
          />
          <Step
            title="Answer Questions"
            description="Multiple-choice questions with instant feedback."
          />
          <Step
            title="See Your Score"
            description="Track progress and replay anytime."
          />
        </div>
      </section>

      <div className="divider opacity-30" />

      {/* 3️⃣ Features */}
      <section className="px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Core Features</h2>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <Feature
            title="🎮 Play"
            description="Jump straight into quizzes with a smooth, distraction-free experience."
          />
          <Feature
            title="✍️ Create"
            description="Create quizzes easily or upload your own data-driven questions."
          />
          <Feature
            title="🔗 Share"
            description="Share quizzes with friends, classrooms, or teams."
          />
        </div>
      </section>

      <div className="divider opacity-30" />

      {/* 4️⃣ Categories */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Quiz Categories
        </h2>

        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[
            '⚽ Sports',
            '🌍 Geography',
            '🎾 Tennis',
            '🏛 History',
            '🗣 Languages',
            '🎨 Colors',
            '🏆 Champions',
            '📚 General',
          ].map((cat) => (
            <div
              key={cat}
              className="card border-base-300 bg-base-100 truncate border p-6 shadow-sm">
              {cat}
            </div>
          ))}
        </div>
      </section>

      <div className="divider opacity-30" />

      {/* 5️⃣ Why */}
      <section className="px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Why This Quiz App?
        </h2>

        <ul className="mx-auto max-w-3xl space-y-4 text-lg opacity-80">
          <li>⚡ Fast and lightweight</li>
          <li>⌨️ Keyboard-friendly gameplay</li>
          <li>🔄 Replayable with shuffled questions</li>
          <li>📂 Simple, structured quiz data</li>
        </ul>
      </section>

      <div className="divider opacity-30" />

      {/* 6️⃣ Audience */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Built for Everyone
        </h2>

        <div className="grid gap-10 md:grid-cols-2">
          <Audience
            title="For Players"
            items={['Quick quizzes', 'Track progress', 'Practice daily']}
          />
          <Audience
            title="For Creators"
            items={[
              'Create custom quizzes',
              'Organize by category',
              'Share instantly',
            ]}
          />
        </div>
      </section>

      <div className="divider opacity-30" />

      {/* 7️⃣ CTA */}
      <section className="px-6 py-24 text-center">
        <h2 className="mb-6 text-4xl font-bold">Ready to start playing?</h2>
        <p className="mb-10 text-lg opacity-80">
          Jump into your first quiz in seconds.
        </p>

        <Link href="/play" className="btn btn-primary btn-lg">
          ▶️ Go to Play
        </Link>
      </section>

      <div className="divider opacity-30" />

      {/* 8️⃣ Footer */}
      <footer className="px-6 py-10 text-center text-sm opacity-60">
        © {new Date().getFullYear()} Quiz App · Play · Create · Share
      </footer>
    </main>
  );
};

export default LandingPage;
