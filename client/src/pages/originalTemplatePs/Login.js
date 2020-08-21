import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css';
import { AuthContext } from '../../AuthContext'
import LoginForm from '../../components/LoginForm'

function Login(props) {

  const { isAuth } = useContext(AuthContext)

  console.log("login auth: ", isAuth)

  return (
      isAuth ? <Redirect to='/' />
        :
        <Container className="signup">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <LoginForm {...props}/>
            </Col>
          </Row>
        </Container>
  );
}

export default Login;