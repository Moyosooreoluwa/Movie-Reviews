import Container from 'react-bootstrap/Container';

const LoadingSpinner = () => {
  return (
    <div>
      <Container>
        <div className="spinner mt-3"></div>
        <div className="loading">Loading...</div>
      </Container>
    </div>
  );
};

export default LoadingSpinner;
