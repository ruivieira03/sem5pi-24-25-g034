import React from 'react';
import './About.css';

function About() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ fontSize: '2.5rem', color: '#333' }}>About Us</h1>
            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
                Welcome to our platform! We are dedicated to providing innovative solutions 
                that empower individuals and businesses to achieve their goals. Our team 
                is composed of passionate professionals who strive for excellence and are 
                committed to delivering high-quality services tailored to your needs.
            </p>
            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
                With a focus on innovation, collaboration, and integrity, we aim to create 
                a positive impact in the industries we serve. Thank you for choosing to learn more about us, 
                and we look forward to partnering with you on your journey to success.
            </p>
        </div>
    );
}

export default About;