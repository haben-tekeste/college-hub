// components
import Nav from "./components/Nav";
import Answer from "./pages/AnswerPage";
import ProtectedRoute from "./components/ProtectedRoute";

// pages
import ProfilePage from "./pages/ProfilePage";
import ProjectPage from "./pages/ProjectPage";
import QuestionsPage from "./pages/QuestionsPage";
import SignInPage from "./pages/AuthPage";
import BlogPage from "./pages/BlogPage";
import BooksPage from "./pages/BooksPage";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

//popups
import ProjectDetails from "./components/pop-ups/ProjectDetails";
import Applications from "./components/pop-ups/Applications";
import CreateProject from "./components/pop-ups/CreateProject";
import ApplyProject from "./components/pop-ups/ApplyProject";

// error
import Error from "./components/Error";

// react router
import { Routes, Route } from "react-router-dom";
import MyBooks from "./pages/MyBooks";

function App() {
  return (
    <div className="App flex">
      <Nav />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/auth" element={<SignInPage />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/projects/apply/:id" element={<ApplyProject />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/questions/:id" element={<Answer />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/my-books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Route>
        <Route path="/notfound" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
