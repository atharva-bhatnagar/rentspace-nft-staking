import React, { useContext, useState } from 'react';
import './RegisterUser.css';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../MainContainer';
import { useAuth } from '../../utils/useAuthClient';

const RegisterUser = () => {
    // State variables
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [error, setError] = useState('');
    const {actors}=useAuth()
    
    // Hooks
    const navigate = useNavigate();
    const { setIsConnect, setConnectedWallet } = useContext(myContext);

    // Event Handlers
    const handleChange = (e) => {
        setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const navigateToHome = () => {
        navigate('/');
        setIsConnect(true);
    };

    const navigateToDashboard = (e) => {
        e.preventDefault(); 
        if (userData.username.trim() === '' || userData.email.trim() === '') {
            setError('Please fill out all fields.');
        } else {
            navigate('/userDashboard', {state:{userData: userData }});
            setConnectedWallet(true);
        }
    };

    const registerNewUser=async()=>{
        await actors.userActor.createNewUser({name:userData.username,email:userData.email}).then((res)=>{
            console.log(res)
            if(res.err){
                alert(res.err)
            }else{
                alert(res.ok)
                setTimeout(()=>{
                    navigate('/userDashboard')
                },1000)
            }
        })
    }

    // Render Method
    return (
        <div className='RegisterPage-container'>
            <div className='form-content'>
                <div className='heading-cont'>
                    <h1>Register to rentSpace</h1>
                </div>
                <form className='form-container' onSubmit={navigateToDashboard}>
                    <div className='form-field'>
                        <label htmlFor='username'>Username</label>
                        <input type='text' onChange={handleChange} name='username' id='username' placeholder='Enter your username' />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' onChange={handleChange} id='email' name='email' placeholder='Enter your email' />
                    </div>
                    <div className='form-field'>
                        <button type='submit' onClick={registerNewUser}>Signup</button>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                </form>
                {/* <div className='existing-wallet-text'>
                    <p onClick={navigateToHome}>I already have a wallet</p>
                </div> */}
            </div>
            <div className='imgContainer'>
                <img src='nft.png' alt='NFT' />
            </div>
        </div>
    );
};

export default RegisterUser;
