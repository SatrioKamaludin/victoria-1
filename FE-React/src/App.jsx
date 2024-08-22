import './App.css'
import ExpressContainer from './components/ExpressContainer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
    getCustomersExpress,
    addCustomerExpress,
    updateCustomerExpress,
    deleteCustomerExpress,
    getCustomersNest,
    addCustomerNest,
    updateCustomerNest,
    deleteCustomerNest,
} from "./api/api";
import CustomerContainer from './components/CustomerContainer';
import Navbar from './components/Navbar';

const App = () => {
    return (
        
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/express"
                    element={
                        <CustomerContainer
                            getCustomersAPI={getCustomersExpress}
                            addCustomerAPI={addCustomerExpress}
                            updateCustomerAPI={updateCustomerExpress}
                            deleteCustomerAPI={deleteCustomerExpress}
                            title="ExpressJS"
                        />
                    }
                />
                <Route
                    path="/nest"
                    element={
                        <CustomerContainer
                            getCustomersAPI={getCustomersNest}
                            addCustomerAPI={addCustomerNest}
                            updateCustomerAPI={updateCustomerNest}
                            deleteCustomerAPI={deleteCustomerNest}
                            title="NestJS"
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;

