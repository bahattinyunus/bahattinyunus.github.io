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
import { Intelligence } from "./pages/Intelligence";
import Doctrine from "./pages/Doctrine";
import ProjectDetail from "./pages/ProjectDetail";
import { CyberShell } from "./components/layout/CyberShell";
import { VaultProvider } from "./contexts/VaultContext";
import { BootSequence } from "./components/cyber-ui/BootSequence";
import { ClearanceProvider } from "./components/cyber-ui/SecurityClearance";
import { useState, useEffect } from "react";

function Router() {
  return (
    <CyberShell>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/arsenal"} component={Arsenal} />
        <Route path={"/operations"} component={Operations} />
        <Route path={"/intelligence"} component={Intelligence} />
        <Route path={"/doctrine"} component={Doctrine} />
        <Route path={"/operations/:projectId"} component={ProjectDetail} />
        <Route path={"/comms"} component={Comms} />

        {/* Legacy redirects or catch-all */}
        <Route component={NotFound} />
      </Switch>
    </CyberShell>
  );
}

function App() {
  const [bootCompleted, setBootCompleted] = useState(false);

  useEffect(() => {
    const isBooted = sessionStorage.getItem("system_booted");
    if (isBooted) setBootCompleted(true);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem("system_booted", "true");
    setBootCompleted(true);
  };

  return (
    <ErrorBoundary>
      {!bootCompleted && <BootSequence onComplete={handleBootComplete} />}
      <ThemeProvider defaultTheme="dark">
        <VaultProvider>
          <ClearanceProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ClearanceProvider>
        </VaultProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
