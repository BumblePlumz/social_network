import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Met à jour le state pour afficher la page d'erreur
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
    // Vous pouvez également envoyer l'erreur à un service externe ici
    console.error("Error captured:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Page d'erreur personnalisée
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Quelque chose s'est mal passé.</h1>
          <h2>Erreur : {this.state.error?.toString()}</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: "20px" }}>
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    // Rendre les enfants si aucune erreur n'est capturée
    return this.props.children;
  }
}

export default ErrorBoundary;
