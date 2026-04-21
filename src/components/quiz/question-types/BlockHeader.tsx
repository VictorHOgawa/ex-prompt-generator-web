import type { QuizQuestion } from '@/types'
import { quizIconMap } from '@/lib/utils/quiz-icons'

interface BlockHeaderProps {
  question: QuizQuestion
}

export default function BlockHeader({ question }: BlockHeaderProps) {
  const Icon = question.icon ? quizIconMap[question.icon] : null

  return (
    <div className="text-center py-6">
      {Icon && (
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-yellow/10 flex items-center justify-center">
            <Icon size={32} className="text-brand-yellow" />
          </div>
        </div>
      )}
      {question.blockTitle && (
        <h2 className="text-xl font-bold text-brand-black mb-2">
          {question.blockTitle}
        </h2>
      )}
      {question.subtitle && (
        <p className="text-sm text-brand-gray-400 max-w-md mx-auto">
          {question.subtitle}
        </p>
      )}
    </div>
  )
}
