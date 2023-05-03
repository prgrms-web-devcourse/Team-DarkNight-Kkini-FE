import { Component, ErrorInfo, ReactNode } from 'react';

type ErrorBoundaryProps = {
  fallback: ReactNode;
  children?: ReactNode;
};

type ErrorBoundaryStates = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryStates {
    // 에러가 발생하면 다음 렌더링에서 fallback UI를 보여주도록 state 업데이트
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 리포팅 서비스에 에러 기록 가능
    console.error('CustomErrorBoundary Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 에러 발생 시 fallback UI 렌더링
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
