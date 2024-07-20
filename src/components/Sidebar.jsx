import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isVisible }) => {
    return (
        <div className={`sidebar ${isVisible ? 'visible' : 'hidden'}`}>
            <div className='sidebar-header'>
                <h2 style={{marginLeft: '55px', marginBottom: '10px'}}>Shelves</h2>
            </div>
            <hr />
            <ul className='sidebar-menu'>
                <li className='sidebar-section'>
                    <h3>Want to Read</h3>
                    <ul>
                        <li><Link style={{ textDecoration: 'none', color: 'blue' }} to='/shelves/want-to-read'>View All</Link></li>
                    </ul>
                </li>
                <li className='sidebar-section'>
                    <h3>Reading</h3>
                    <ul>
                        <li><Link style={{ textDecoration: 'none', color: 'blue' }} to='/shelves/reading'>View All</Link></li>
                    </ul>
                </li>
                <li className='sidebar-section'>
                    <h3>Finished Reading</h3>
                    <ul>
                        <li><Link style={{ textDecoration: 'none', color: 'blue' }} to='/shelves/finished-reading'>View All</Link></li>
                    </ul>
                </li>
                <li className='sidebar-section'>
                    <h2>Custom Shelves</h2>
                    <hr />
                    <ul>
                        <li><Link style={{ textDecoration: 'none', color: 'blue' }} to='/shelves/custom-shelves'>View All</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
