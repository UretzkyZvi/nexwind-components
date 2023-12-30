import { BrowserRouter   as Router, Route, Routes } from "react-router-dom";
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
 
  return (
    <Router  basename="/nexwind-components">
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/introduction" element={<IntroductionPage/>} />
        <Route path="/list-view" element={<ListViewPage/>} />
        <Route path="/forms" element={<FormPage/>} />
        <Route path="/date-picker" element={<DatePickerPage/>} />
        <Route path="/table" element={<TablePage/>} />
        <Route path="/file-uploader" element={<FileUploadPage/>} />
        <Route path="/contribute"  element={<ContributePage/>}/>
        <Route path='/showcase/movie-browse' element={<MoviePage/>} />
        <Route path="*" element={<h1>Not Found</h1>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
