const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map(i => (
      <span
        key={i}
        className="w-2 h-2 rounded-full bg-cyan-400"
        style={{
          animation: `chatBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
        }}
      />
    ))}
    <style>{`
      @keyframes chatBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
        30% { transform: translateY(-6px); opacity: 1; }
      }
    `}</style>
  </div>
)

export default TypingIndicator
