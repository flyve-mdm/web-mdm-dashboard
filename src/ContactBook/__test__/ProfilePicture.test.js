import React from 'react';
import ReactDOM from 'react-dom';
import ProfilePicture from '../ProfilePicture';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProfilePicture />, div);
});
