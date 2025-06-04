import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar'; 
import Home from './Home';
import Signup from './User/Signup';
import Login from './User/Login';
import ResetPasswordLink from './User/ResetPasswordLink';
import ResetPassword from './User/ResetPassword';
import Profile from './User/Profile';
import Dashboard from './Dashboard';
import VehicleList from './Book/VehicleList';
import DateSearch from './Book/DateSearch';
import BookingConfirmation from './Book/BookingConfirmation'
import PaymentPage from './Book/PaymentPage';
import BookingSummary from './Book/BookingSummary';
import AddReview from './Book/Review';
import RentOrRequest from './Rides/RentOrRequest';
import RequestRide from './Rides/RequestRide';
import Themes from './Themes';
import AdminLogin from './Admin/AdminLogin';
import Panel from './Admin/Panel';
import VehicleManagementPage from './Admin/VehicleManagement';
import BookingManagementPage from './Admin/BookingManagement';
import DriverLogin from './Driver/DriverLogin';
import UserBookings from './Book/UserBookings';
import RidePayment from './Rides/RidePayment';
import RideSummaryPage from './Rides/RideSummary';
import UserManagement from './Admin/UserManagement';
import DriverManagement from './Admin/DriverManagement';
import RideManagement from './Admin/RideManagement';
import MyRides from './Rides/MyRides';
import Wallet from './Wallet';
import DriverRegister from './Driver/DriverRegister';
import DriverDashboard from './Driver/DriverDashboard';
import ChatComponent from './ChatComponent';
import WalletComponent from './WalletComponent';
const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="pt-16 px-4"> {/* Tailwind class for padding */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cars" element={<VehicleList />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/reset-link" element={<ResetPasswordLink />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/search" element={<DateSearch />} />
                    <Route path="/book" element={<BookingConfirmation />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/booking-summary/:bookingId" element={<BookingSummary />} />
                    <Route path="/myBookings" element={<UserBookings />} />
                    <Route path="/add-review/:vehicleId" element={<AddReview />} />
                    <Route path="/rent-or-request" element={<RentOrRequest />} />
                    <Route path="/request-ride" element={<RequestRide/>}/>
                   <Route path="/admin" element={<AdminLogin/>}/>
                   <Route path="/panel" element={<Panel/>}/>
                   <Route path="/vehiclemanage" element={<VehicleManagementPage/>}/>
                   <Route path="/bookingsmanage" element={<BookingManagementPage/>}/>
                   <Route path='/driver-dashboard' element={<DriverDashboard/>}/>
                   <Route path="/ride-payment" element={<RidePayment/>}/>
                   <Route path="/ride-summary/:id" element={<RideSummaryPage />} />
                   <Route path='/usermanagement' element={<UserManagement/>}/>
                   <Route path='/drivermanagement' element={<DriverManagement/>}/>
                   <Route path='/ridemanagement' element={<RideManagement/>}/>
                   <Route path='/my-rides' element={<MyRides/>}/>
                   <Route path='/wallet' element={<Wallet/>}/>
                   <Route path='/driver-login' element={<DriverLogin/>}/>
                   <Route path='/driver-register' element={<DriverRegister/>}/>
                   <Route path='/chat' element={<ChatComponent/>}/>
                   
                   <Route path="/wallett" element={<WalletComponent/>}/>
                </Routes>
            </div>
            <Themes/>
        </Router>
    );
};

export default App;
