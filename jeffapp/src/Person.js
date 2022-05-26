import React from 'react';

export default function Person(props) {
    const {user} = props;

    return(
        <div>
            <h2>Name: {user.first_name} {user.last_name}</h2>
            <p>Email: {user.email}</p>
        </div>
    )
}