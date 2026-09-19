import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  sectionName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full min-h-[350px] flex flex-col items-center justify-center p-8 bg-[#111319] border border-white/10 rounded-3xl text-center my-6">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-xl font-bold font-anton uppercase tracking-wide text-white mb-2">
            {this.props.sectionName ? `${this.props.sectionName} Temporarily Unavailable` : "Component Render Notice"}
          </h3>
          <p className="text-sm text-white/60 max-w-md mb-6 leading-relaxed">
            A graphic or memory exception occurred while rendering this interactive module. The rest of the portfolio remains fully accessible.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
          >
            <RefreshCw size={14} />
            Reload Module
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
