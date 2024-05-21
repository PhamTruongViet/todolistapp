import React from "react";
import AppNavigation from "./navigations/AppNavigation";
import { AuthenticatedUserProvider } from "./contexts/AuthContext";
const App = () => {
  return (
    <AuthenticatedUserProvider>
      <AppNavigation />
    </AuthenticatedUserProvider>
  );
};

export default App;
