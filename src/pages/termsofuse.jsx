import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TermsOfUse = () => {
  const navigate = useNavigate();

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
      maxWidth: '800px',
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
    paragraph: {
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#ccc',
      marginBottom: '20px',
    },
    backButton: {
      marginBottom: '20px',
      padding: '10px 20px',
      backgroundColor: '#e50914',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button onClick={() => navigate(-1)} style={styles.backButton}>← Back</button>
        <h1 style={styles.heading}>Terms of Use</h1>
        <p style={styles.paragraph}>
          Welcome to our streaming platform. By using our services, you agree to comply with our terms and conditions.
        </p>
        <p style={styles.paragraph}>
          The content on our site is for personal and non-commercial use only. You agree not to reproduce, distribute,
          or modify any part of the content without express permission.
        </p>
        <p style={styles.paragraph}>
          Your account is for your personal use only. You are responsible for maintaining the confidentiality of your
          login information and for all activities under your account.
        </p>
        <p style={styles.paragraph}>
          We reserve the right to modify or terminate the service at any time without prior notice. Continued use of
          the service following changes means you accept those changes.
        </p>
        <p style={styles.paragraph}>
  If you have any questions about these terms, please{' '}
  <Link to="/contact-us" style={{ color: '#e50914', textDecoration: 'underline' }}>
    contact us
  </Link>.
</p>
      </div>
    </div>
  );
};

export default TermsOfUse;
