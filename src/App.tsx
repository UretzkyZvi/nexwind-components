import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListViewPage from "./pages/ListViewPage";
import FormPage from "./pages/FormPage";
import DatePickerPage from "./pages/DatePickerPage";
import TablePage from "./pages/TablePage";
import IntroductionPage from "./pages/Introduction";
import FileUploadPage from "./pages/FileUploadPage";
import ContributePage from "./pages/ContributePage";
import MoviePage from "./pages/MoviePage";
 

interface Item {
  id: number;
  name: string;
}
function App() {
  // useEffect(() => {
  //   // Add classes to the html and body tags
  //   document.documentElement.className = "h-full ";
  //   document.body.className = "h-full bg-background dark:bg-dark-background";

  //   // Optional: Clean up function to remove classes when the component unmounts
  //   return () => {
  //     document.documentElement.classList.remove("h-full");
  //     document.body.classList.remove("h-full");
  //   };
  // }, []);
  return (
    <Router>
      <Routes>
        <Route index path="/" Component={HomePage} />
        <Route path="/introduction" Component={IntroductionPage} />
        <Route path="/list-view" Component={ListViewPage} />
        <Route path="/forms" Component={FormPage} />
        <Route path="/date-picker" Component={DatePickerPage} />
        <Route path="/table" Component={TablePage} />
        <Route path="/file-uploader" Component={FileUploadPage} />
        <Route path="/contribute"  Component={ContributePage}/>
        <Route path='/showcase/movie-browse' Component={MoviePage} />
        <Route path="*" element={<h1>Not Found</h1>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
