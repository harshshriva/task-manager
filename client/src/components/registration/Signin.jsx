import './registration.scss';
import '../../styles/components/_button.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signin } from '../../redux/authSlice';
import { notification } from "antd";

const Signin = () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if email and password are not empty
        if (!state.email || !state.password) {
            setError(<h6>Please Enter Your Email and Password.</h6>);
            return;
        }

        // Dispatch signin action if fields are filled
        try {
            await dispatch(
                signin({
                    email: state.email,
                    password: state.password,
                })
            );

            // Reset form fields and error state
            setState({
                email: '',
                password: '',
            });
            setError('');

            // Show success notification
            notification.success({
                message: 'Sign In Successful',
                description: 'You have successfully signed in.',
				placement: 'bottomRight',
				duration:2,
				role:"alert"
            });
        } catch (error) {
            // Handle sign in error here if needed
            console.error('Sign in error:', error);
        }
    };

    return (
        <div className='signup-form'>
            <div className='signup-form__wrapper'>
                <form className='form' onSubmit={handleSubmit}>
                    <h4>Sign In</h4>
                    {error && <p className="error-message">{error}</p>}
                    <div className='form-group'>
                        <input
                            type='email'
                            name='email'
                            value={state.email}
                            id=''
                            placeholder='Enter Email'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            name='password'
                            value={state.password}
                            id=''
                            placeholder='Enter Password'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button className='button'>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
