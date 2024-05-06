// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './componentes/Header';
import Footer from './componentes/Footer';
import UploadImageForm from './componentes/UploadImageForm'; // Assuming you have a Home component
import LoginForm from './componentes/LoginForm'; // Assuming you have an About component
import SignupPage from './componentes/SignupPage'; // Assuming you have a Contact component
import ImageGallery from './componentes/ImageGallery'; // Assuming you have an ImageGallery component


const App = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="*" element={<UploadImageForm />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/gallery" element={<ImageGallery />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
