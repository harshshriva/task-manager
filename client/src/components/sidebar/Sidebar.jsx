import './Sidebar.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
	const { auth } = useSelector((state) => ({ ...state }));
	const { currentUser } = auth;

	return (
		<div>
			<ul className='sidebar'>
				<li className='list-item'>
					<h6>.................</h6>
				</li>
				<li className='list-item'>
					<h6>{currentUser.username}</h6>
				</li>
				<li className='list-item'>
					<Link to='/dashboard'>Dashboard</Link>
				</li>
				<li className='list-item'>
					<Link to='/settings'>Settings</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
