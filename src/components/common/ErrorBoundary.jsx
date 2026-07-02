import { Component } from 'react'
import { Button } from '@/components/ui/button'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled error caught by ErrorBoundary:', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="text-lg font-medium">發生預期外的錯誤</div>
        <div className="text-sm text-muted-foreground">請重新整理頁面再試一次</div>
        <Button onClick={() => window.location.reload()}>重新整理</Button>
      </div>
    )
  }
}
