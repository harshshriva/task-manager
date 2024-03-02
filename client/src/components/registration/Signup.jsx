import './registration.scss';
import '../../styles/components/_button.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/authSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        username: '',
    });
    const [successMessage, setSuccessMessage] = useState('');

    const validateEmail = (email) => {
        // Regular expression for basic email validation
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!state.username) {
            setErrors({ ...errors, username: <span className='danger'>Please enter your username</span> });
            return;
        }
        if (!state.email) {
            setErrors({ ...errors, email: <span className='danger'>Please enter your email</span> });
            return;
        }
        if (!validateEmail(state.email)) {
            setErrors({ ...errors, email: <span className='danger'>Please enter a valid email address</span> });
            return;
        }
        if (!state.password) {
            setErrors({ ...errors, password: <span className='danger'>Please enter your password</span>});
            return;
        }

        dispatch(
            register({
                username: state.username,
                password: state.password,
                email: state.email,
            })
        );

        // Reset form and show success message
        setState({ email: '', password: '', username: '' });
        setSuccessMessage('Successfully signed up!');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000); // Hide success message after 3 seconds
    };

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
        // Clear error message when user starts typing again
        setErrors({ ...errors, [e.target.name]: '' });
    };

    return (
        <div className='signup-form'>
            <div className='signup-form__wrapper'>
                <form className='form' onSubmit={handleSubmit}>
                    <h4>Sign up</h4>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            name='username'
                            value={state.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span className='error'>{errors.username}</span>}
                    </div>
                    <div className='form-group'>
                        <input
                            type='email'
                            name='email'
                            value={state.email}
                            placeholder='Enter Email'
                            onChange={handleChange}
                        />
                        {errors.email && <span className='error'>{errors.email}</span>}
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            name='password'
                            value={state.password}
                            placeholder='Enter Password'
                            onChange={handleChange}
                        />
                        {errors.password && <span className='error'>{errors.password}</span>}
                    </div>
                    <div className='form-group'>
                        <button className='button'>Sign Up</button>
                    </div>
                </form>
                {successMessage && <div className='success-message'>{successMessage}</div>}
            </div>
        </div>
    );
};

export default Signup;
