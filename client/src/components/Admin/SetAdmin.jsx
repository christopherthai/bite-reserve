import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper } from '@material-ui/core';

function SetAdmin() {
    const [searchParams, setSearchParams] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: ''
    });
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = Object.entries(searchParams)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        const response = await fetch(`/api/users?${query}`);
        const data = await response.json();
        setUsers(data);
    };

    const toggleAdminStatus = async (user) => {
        const updatedStatus = !user.IsAdmin;
        const response = await fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...user, IsAdmin: updatedStatus })
        });
        if (response.ok) {
            setUsers(users.map(u => u.id === user.id ? { ...u, IsAdmin: updatedStatus } : u));
        }
    };

    return (
        <Paper style={{ padding: '20px', margin: '20px', backgroundColor: 'white' }}>
            <form onSubmit={handleSubmit}>
                <TextField name="id" label="User ID" value={searchParams.id} onChange={handleChange} />
                <TextField name="username" label="Username" value={searchParams.username} onChange={handleChange} />
                <TextField name="first_name" label="First Name" value={searchParams.first_name} onChange={handleChange} />
                <TextField name="last_name" label="Last Name" value={searchParams.last_name} onChange={handleChange} />
                <Button type="submit" color="primary" variant="contained" style={{ marginTop: '10px' }}>Search</Button>
            </form>
            <div style={{ marginTop: '20px' }}>
                {users.map(user => (
                    <div key={user.id} style={{ marginTop: '10px' }}>
                        {user.username} ({user.first_name} {user.last_name}) - {user.IsAdmin ? 'Admin' : 'User'}
                        <Button onClick={() => toggleAdminStatus(user)} color="primary" variant="contained" style={{ marginLeft: '10px' }}>
                            {user.IsAdmin ? 'Revoke Admin' : 'Make Admin'}
                        </Button>
                    </div>
                ))}
            </div>
        </Paper>
    );
}

export default SetAdmin;