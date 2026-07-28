function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-zinc-950">
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-600 opacity-30 blur-3xl" />
      <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-teal-500 opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-pink-600 opacity-20 blur-3xl" />
    </div>
  )
}

export default AuroraBackground