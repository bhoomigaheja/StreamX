import React from 'react';

const HelpCenter = () => {
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
    list: {
      paddingLeft: '20px',
      color: '#ccc',
      lineHeight: '1.8',
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Help Center</h1>
        <p style={styles.paragraph}>
          Need assistance? We’re here to help. Below are answers to the most common questions.
        </p>

        <ul style={styles.list}>
          <li>How do I reset my password?</li>
          <li>Why isn’t my video loading?</li>
          <li>How do I manage my subscription?</li>
          <li>What devices are supported?</li>
          <li>Where can I view my billing history?</li>
        </ul>

        <p style={styles.paragraph}>
          If your issue is not listed here, feel free to <a href="/contact-us" style={{ color: '#e50914', textDecoration: 'underline' }}>contact us</a> for personalized support.
        </p>
      </div>
    </div>
  );
};

export default HelpCenter;
