import { Component, ErrorInfo } from 'react';


class ErrorBoundary extends Component {
  state = {hasError: false}

  static getDerivedStateFromError(error) {
    return { hasError: true, error:error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if(this.state.hasError) {
      return <h2>Something went wrong!</h2>;
    }
    return this.props.children
  }
}

export default ErrorBoundary;

