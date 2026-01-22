// @ts-nocheck
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Arsenal from "./pages/Arsenal";
import Operations from "./pages/Operations";
import Comms from "./pages/Comms";
import Intelligence from "./pages/Intelligence";
import { CyberShell } from "./components/layout/CyberShell";

function Router() {
  return (
    <CyberShell>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/arsenal"} component={Arsenal} />
        <Route path={"/operations"} component={Operations} />
        <Route path={"/intelligence"} component={Intelligence} />
        <Route path={"/comms"} component={Comms} />

        {/* Legacy redirects or catch-all */}
        <Route component={NotFound} />
      </Switch>
    </CyberShell>
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
