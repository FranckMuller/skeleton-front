import React from "react";

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    state = { hasError: false };

    componentDidCatch(error: any) {
        this.setState({ hasError: true });
        // FYI: https://github.com/facebook/react/issues/12897#issuecomment-410036991
        // FYI: https://github.com/reactjs/reactjs.org/pull/2168
        // On development, react does a trick -> the errors will bubble up to `window`!
        // In ours case it will cause multiple calls of sentry
        // On production, instead, the errors will not bubble up.

        // Raven.captureException(error); TODO: uncomment me if you would like to use sentry
    }

    render() {
        if (this.state.hasError) {
            return null;
        }

        return this.props.children;
    }
}
