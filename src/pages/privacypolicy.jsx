import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
        <h1 style={styles.heading}>Privacy Policy</h1>
        <p style={styles.paragraph}>
          At our platform, we value your privacy. This privacy policy explains how we collect, use, and protect your information.
        </p>
        <p style={styles.paragraph}>
          We collect personal information such as your name, email address, and payment information for the purpose of
          providing our service. We do not sell or share your information with third parties without your consent.
        </p>
        <p style={styles.paragraph}>
          We use cookies to improve your experience on our website and analyze site usage. You can opt-out of cookies
          by adjusting your browser settings.
        </p>
        <p style={styles.paragraph}>
          Your data is stored securely and protected against unauthorized access. However, no method of transmission
          over the internet or electronic storage is 100% secure.
        </p>
        <p style={styles.paragraph}>
          If you have any questions or concerns about our privacy practices, please <a href="/contact-us" style={{ color: '#e50914', textDecoration: 'underline' }}>contact us</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
