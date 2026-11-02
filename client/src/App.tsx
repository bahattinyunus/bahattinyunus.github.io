import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Eski çocukça askeri linkleri doğrudan ana sayfaya yönlendir */}
      <Route path="/arsenal">{() => <Redirect to="/" />}</Route>
      <Route path="/operations">{() => <Redirect to="/" />}</Route>
      <Route path="/intelligence">{() => <Redirect to="/" />}</Route>
      <Route path="/doctrine">{() => <Redirect to="/" />}</Route>
      <Route path="/comms">{() => <Redirect to="/" />}</Route>
      <Route path="/operations/:projectId">{() => <Redirect to="/" />}</Route>
      <Route>{() => <Redirect to="/" />}</Route>
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
