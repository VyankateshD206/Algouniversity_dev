import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  console.log("User in Redux: ", user); // ✅ this should log the correct user

  return (
    <>
      <Navbar/>
      <Footer />
    </>
  );
};

export default Dashboard;
