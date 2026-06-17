const SUGGESTIONS = [
  'Tell me about Harsh Raj',
  'What projects has he built?',
  'What technologies does he know?',
  'What hackathons has he won?',
  'Tell me about AgentVision X',
  'How can I contact him?',
  'What is his internship experience?',
  'What are his achievements?',
]

const SuggestedQuestions = ({ onSelect }) => (
  <div className="px-4 py-3">
    <p className="text-xs text-gray-400 mb-3 font-medium tracking-wide uppercase">
      Suggested questions
    </p>
    <div className="flex flex-wrap gap-2">
      {SUGGESTIONS.map(q => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="px-3 py-1.5 text-xs rounded-full border border-cyan-500/30 text-cyan-300
                     bg-cyan-500/10 hover:bg-cyan-500/20 hover:border-cyan-400/60
                     transition-all duration-200 hover:scale-105 active:scale-95 text-left"
        >
          {q}
        </button>
      ))}
    </div>
  </div>
)

export default SuggestedQuestions
