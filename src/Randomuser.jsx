import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Randomuser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [gender, setGender] = useState('');
  const [nationality, setNationality] = useState('');

  const fetchData = async () => {
    try 
    {
      setLoading(true);
      const criteria = `gender=${gender}&nat=${nationality}`;
      const response = await axios.get(`https://randomuser.me/api/?${criteria}`);
      setUser(response.data.results[0]);
      setLoading(false);
    } 
    catch (error)
     {
      setError(error);
      setLoading(false);
    }
  };

  const handleGenerateClick = () => {
    fetchData();
  };

  return (
    <div className='container'>
      <h2>Faith's Random User Generator</h2>
      <form className='user_form'>
        <label placeholder="Select gender">
          Gender:
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label placeholder="Select a country">
          Nationality:
          <select value={nationality} onChange={(e) => setNationality(e.target.value)}>
            <option value="">Select</option>
            <option value="us">USA</option>
            <option value="uk">UK</option>
            <option value="nigeria">Nigeria</option>
            <option value="canada">Canada</option>
            
          </select>
        </label>
        <button type="button" onClick={handleGenerateClick}>
          Generate
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (

        <p>Error fetching data: {error.message}</p>
      ) : user ? (
        <div className='result'>
          <img src={user.picture.thumbnail} alt="User Picture" />
          <p>Name: {`${user.name.first} ${user.name.last}`}</p>
          <p>Email: {user.email}</p>
          <p>Date of Birth: {new Date(user.dob.date).toLocaleDateString()}</p>
          <p>Phone Number: {user.phone}</p>
          <p>Address: {`${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.postcode}`}</p>

        </div>
      ) : null}
    </div>
  );
};

export default Randomuser;
