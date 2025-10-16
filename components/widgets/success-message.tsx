import { CheckCircle } from "lucide-react"

interface SuccessMessageProps {
  title: string
  description?: string
  fullScreen?: boolean
}

export function SuccessMessage({ title, description, fullScreen = false }: SuccessMessageProps) {
  const content = (
    <div className="text-center space-y-4">
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-500" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )

  if (fullScreen) {
    return <div className="flex items-center justify-center min-h-[80vh]">{content}</div>
  }

  return content
}
