import React from 'react'
import "../App.css";
import SignupForm from "../../components/origcomponents/SignupForm";


function Signup(props) {
  return (
    <Container className="signup">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <SignupForm {...props} />
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
