"use client";

import { Component, type ReactNode } from "react";

// If WebGL is unavailable the 3D scene throws; drop it instead of breaking the page.
export default class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
