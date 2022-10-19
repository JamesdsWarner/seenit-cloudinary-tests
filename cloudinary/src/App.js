import { useState } from "react";
import { GlobalProvider } from "./context/GlobalState";
import CreateQuickEdit from "./components/CreateQuickEdit/CreateQuickEdit.component";
import Sidebar from "./components/Sidebar/Sidebar.component";
import "./App.css";

function App() {
  return (
    <GlobalProvider>
      <div className="App">
        <Sidebar />
        <CreateQuickEdit />
      </div>
    </GlobalProvider>
  );
}

export default App;
