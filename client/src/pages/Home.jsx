// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import { post } from '../services/ApiEndpoint'
// import { Logout } from '../redux/AuthSlice'

// export default function Home() {
//   const user=useSelector((state)=>state.Auth.user)
//   console.log(user)
//   const navigate=useNavigate()
//   const disptach=useDispatch()
//   const gotoAdmin=()=>{
//         navigate('/admin')
//   }
//   const handleLogout=async()=>{
//     try {
//       const request= await post('/api/auth/logout')
//        const resspone= request.data
//        if (request.status==200) {
//            disptach(Logout())
//           navigate('/login')
//        }
//     } catch (error) {
//       console.log(error)
//     }
//   }
//   return (
//     <>

//      <div className='home-container'>
//       <div className='user-card'>
//         <h2> Welcome {user && user.name}</h2>
//         <button className='logout-btn' onClick={handleLogout}>Logout</button>
//         {user && user.role=='admin' ? <button className='admin-btn' onClick={gotoAdmin}>Go To admin</button> :''}

//       </div>
//      </div>

//     </>
//   )
// }

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndpoint";
import { Logout } from "../redux/AuthSlice";

export default function Home() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoAdmin = () => {
    navigate("/admin");
  };

  const handleLogout = async () => {
    try {
      const request = await post("/api/auth/logout");
      if (request.status === 200) {
        dispatch(Logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const quotes = [
    "“The only way to do great work is to love what you do.” – Steve Jobs",
    "“Success is not the key to happiness. Happiness is the key to success.” – Albert Schweitzer",
    "“Believe you can and you're halfway there.” – Theodore Roosevelt",
    "“Your time is limited, don’t waste it living someone else’s life.” – Steve Jobs",
    "“Do something today that your future self will thank you for.”",
    "“Every day may not be good... but there’s something good in every day.”",
    "“Success is not final, failure is not fatal: It is the courage to continue that counts.” – Winston Churchill",
    "“Happiness is not by chance, but by choice.”",
    "“The best way to predict the future is to create it.” – Peter Drucker",
  ];

  // Pick a random quote to display
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <>
      {/* Dummy Navigation Bar */}
      <nav className="navbar">
        <div className="logo">MyApp</div>
        <ul className="nav-links">
          <li>
            <button onClick={() => navigate("/")}>Home</button>
          </li>
          {user?.role === "admin" && (
            <li>
              <button onClick={gotoAdmin}>Admin</button>
            </li>
          )}
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>

      {/* Home Content */}
      <div className="home-container">
        <div className="user-card">
          <h2>Welcome, {user?.name || "Guest"}!</h2>
          <p className="user-role">Role: {user?.role || "User"}</p>
          <div className="actions">
            {user?.role === "admin" && (
              <button className="admin-btn" onClick={gotoAdmin}>
                Go to Admin Panel
              </button>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        {/* Inspirational Section */}
        <div className="quote-section">
          <h3 className="quote-heading">✨ Daily Inspiration ✨</h3>
          <p className="quote">{randomQuote}</p>
        </div>
      </div>
    </>
  );
}
