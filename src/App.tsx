import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ListViewPage from "./pages/ListViewPage";
import FormPage from "./pages/FormPage";
import DatePickerPage from "./pages/DatePickerPage";
import TablePage from "./pages/TablePage";
import IntroductionPage from "./pages/Introduction";
import FileUploadPage from "./pages/FileUploadPage";
import ContributePage from "./pages/ContributePage";
import MoviePage from "./pages/showcases/MoviePage";
import CardsPage from "./pages/CardsPage";
import Showcase from "./pages/Showcase";
import VideoPlayerPage from "./pages/VideoPlayerPage";
import ImageAnnotationPage from "./pages/ImageAnnotationPage";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router basename="/nexwind-components">
      <Routes>
        <Route index path="/" element={<IntroductionPage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/list-view" element={<ListViewPage />} />
        <Route path="/forms" element={<FormPage />} />
        <Route path="/date-picker" element={<DatePickerPage />} />
        <Route path="/table" element={<TablePage />} />
        <Route path="/file-uploader" element={<FileUploadPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/video-player" element={<VideoPlayerPage />} />
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/image-annotation" element={<ImageAnnotationPage />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/showcase" element={<Showcase />} />
        <Route path="/showcase/movie-browse" element={<MoviePage />} />
        
        <Route path="*" element={<h1>Not Found</h1>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
