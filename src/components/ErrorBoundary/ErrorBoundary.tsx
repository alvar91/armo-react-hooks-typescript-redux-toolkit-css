import { Component, ErrorInfo, ReactNode } from "react";

import ErrorPage from "../../pages/ErrorPage";

interface PropsI {
  children?: ReactNode;
}

interface StateI {
  hasError: boolean;
  errorInfo: string | undefined;
}

class ErrorBoundary extends Component<PropsI, StateI> {
  state = {
    hasError: false,
    errorInfo: "",
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorInfo: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  clearState = () => {
    this.setState({ hasError: false, errorInfo: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          errorInfo={this.state.errorInfo}
          clearState={this.clearState}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
