import React from 'react';
import TestImage from './Images/TestImage.jpg';

export default function UserAvatar(props) {
  return (
    <img
    src={TestImage}
    alt="Username here from axios"
    className="img-circle-small"
    />
  )
};