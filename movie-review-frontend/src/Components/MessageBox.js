import Alert from 'react-bootstrap/Alert';

const MessageBox = (props) => {
  return (
    <Alert className="message-box" variant={props.variant || 'info'}>
      {props.children}
    </Alert>
  );
};

export default MessageBox;
