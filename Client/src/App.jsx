// components
import Nav from "./components/Nav";
import Answer from "./pages/AnswerPage";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import ProfilePage from "./pages/ProfilePage";
import ProjectPage from "./pages/ProjectPage";
import QuestionsPage from "./pages/QuestionsPage";
import SignInPage from "./pages/AuthPage";

//popups
import ProjectDetails from "./components/pop-ups/ProjectDetails";
import Applications from "./components/pop-ups/Applications";
import CreateProject from "./components/pop-ups/CreateProject";
import ApplyProject from "./components/pop-ups/ApplyProject";

// error
import Error from "./components/Error";

// react router
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App flex">
      <Nav />
      <Routes>
        <Route path="/auth" element={<SignInPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/apply/:id" element={<ApplyProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/questions/:id" element={<Answer />} />
        </Route>
        <Route path="/notfound" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
