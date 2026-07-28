import AuroraBackground from './components/AuroraBackground'
import Board from './components/Board'

function App() {
  return (
    <div className="relative min-h-screen text-white">
      <AuroraBackground />
      <header className="text-center pt-12 pb-6">
        <h1 className="text-4xl font-bold">Aurora Board</h1>
        <p className="text-zinc-400 text-sm mt-2">Your tasks, drifting into place</p>
      </header>
      <Board />
    </div>
  )
}

export default App