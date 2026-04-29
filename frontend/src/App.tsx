import { ReactNode } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {getToken} from './utils/auth';

import HomePage from './pages/HomePage';
import NewsDetailsPage from './pages/NewsDetailsPage';
import NewsFormPage from './pages/NewsFormPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// @ts-ignore
import './App.css';


function PrivateRoute({ children }: { children: ReactNode }) {
    return getToken() ? children : <Navigate to="/login" replace/>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route path="/" element={<PrivateRoute> <HomePage/> </PrivateRoute>}/>

                <Route path="/news/:id" element={<PrivateRoute> <NewsDetailsPage/> </PrivateRoute>}/>

                <Route path="/create" element={<PrivateRoute> <NewsFormPage/> </PrivateRoute>}/>

                <Route path="/edit/:id" element={<PrivateRoute> <NewsFormPage/> </PrivateRoute>}/>

                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;