import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add functionality to store the form data (e.g., API call)
    console.log({ name, email, message });
  };

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#111',
      color: 'white',
      padding: '50px 20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      width: '100%',
      maxWidth: '600px',  // Adjusted container width for a more standard size
      backgroundColor: '#1e1e1e',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    },
    heading: {
      fontSize: '32px',
      marginBottom: '20px',
      borderBottom: '1px solid #444',
      paddingBottom: '10px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      fontSize: '16px',
      color: '#ccc',
      marginBottom: '5px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#333',
      border: '1px solid #444',
      borderRadius: '6px',
      color: 'white',
      fontSize: '16px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#e50914',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    backButton: {
      padding: '10px 20px',
      backgroundColor: '#e50914',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      marginBottom: '20px',
      fontSize: '16px',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
        <h1 style={styles.heading}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ ...styles.input, height: '150px' }}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
