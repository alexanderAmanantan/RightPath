import React, { useState, useEffect } from 'react';
import DefaultModal from '../../SubComponents/modal/modal';
import '../../SubComponents/modal/modal.css';
import './Access.css';
import { Container, Form, Button, Row, Col, Alert, ProgressBar } from 'react-bootstrap';
import axios from 'axios';

function AccessPage({ resetActivePage }) {
  const [isModalOpen, setIsModalOpen] = useState(true); // Open the modal immediately when the page loads
  const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup forms
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

  useEffect(() => {
    // Reset modal state to true whenever the component is mounted (i.e., page is loaded)
    setIsModalOpen(true);

    // Reset active page when modal is closed
    return () => {
      resetActivePage(); // This will reset the active page state in NavbarComponent
    };
  }, [resetActivePage]);

  const resetFormFields = () => {
    setEmail('');
    setPassword('');
    setPasswordStrength(0);
    setFirstName('');
    setLastName('');
    setContactNumber('');
    setRepeatPassword('');
    setValidated(false);
    setErrorMessage('');
    setDoPasswordsMatch(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetFormFields();
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
    resetFormFields();
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    const regexWeak = /.{8,}/; // At least 8 characters
    const regexMedium = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/; // Lowercase, uppercase, number
    const regexStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/; // Lowercase, uppercase, number, special character

    if (regexWeak.test(password)) strength = 1;
    if (regexMedium.test(password)) strength = 2;
    if (regexStrong.test(password)) strength = 3;

    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleRepeatPasswordChange = (e) => {
    const repeatPwd = e.target.value;
    setRepeatPassword(repeatPwd);

    if (password === repeatPwd) {
      setDoPasswordsMatch(true);
    } else {
      setDoPasswordsMatch(false);
    }
  };

  const handleInputValidation = () => {
    setValidated(true);
  };

  const handleLoginSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const response = await axios.post('/api/login', { email, password });
        if (response.status === 200) {
          console.log('Login successful');
          closeModal();
        }
      } catch (error) {
        setErrorMessage('Invalid credentials, please try again.');
        console.error('Login failed:', error);
      }
    }
    setValidated(true);
  };

  const handleSignupSubmit = async (event) => {
    const form = event.currentTarget;
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      setValidated(false);
      event.preventDefault();
      return;
    }

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      try {
        const response = await axios.post('/api/signup', {
          email,
          firstName,
          lastName,
          contactNumber,
          password,
          repeatPassword,
        });
        if (response.status === 200) {
          console.log('Signup successful');
          closeModal();
        }
      } catch (error) {
        setErrorMessage('Signup failed. Please try again.');
        console.error('Signup failed:', error);
      }
    }
    setValidated(true);
  };

  return (
    <div className="AccessPage">
      <DefaultModal
        show={isModalOpen}
        onClose={closeModal}
        title={isSignup ? "SIGN UP" : "LOGIN/SIGNUP"}
      >
        <p>{isSignup ? 'Create an account' : 'Welcome to the login/signup page. Please log in below:'}</p>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        {isSignup ? (
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                <Form noValidate validated={validated} onSubmit={handleSignupSubmit}>
                  <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); handleInputValidation(); }}
                      required
                      pattern="^[A-Za-z][A-Za-z ]*$"
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      First name must contain only letters and spaces.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); handleInputValidation(); }}
                      required
                      pattern="^[A-Za-z][A-Za-z ]*$" // Regex validation for last name
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      Last name must contain only letters and spaces.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); handleInputValidation(); }}
                      required
                      pattern="^[A-Za-z0-9._%+-]+@$" // Regex to ensure @ is present
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      Please provide an email address containing '@' symbol.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formContactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone number"
                      value={contactNumber}
                      onChange={(e) => { setContactNumber(e.target.value); handleInputValidation(); }}
                      required
                      pattern="^(09|\+639)\d{9}$" // Regex to validate Philippine contact numbers
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      Please enter a valid Philippine phone number (09 or +63).
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => { handlePasswordChange(e); handleInputValidation(); }}
                      required
                      minLength={8} // Enforces password length to be at least 8 characters
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      Password must be at least 8 characters long.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password strength indicator */}
                  <Form.Group controlId="formPasswordStrength">
                    <ProgressBar
                      now={passwordStrength * 33}
                      label={passwordStrength === 0 ? 'Weak' : passwordStrength === 1 ? 'Medium' : 'Strong'}
                      variant={passwordStrength === 0 ? 'danger' : passwordStrength === 1 ? 'warning' : 'success'}
                    />
                  </Form.Group>

                  <Form.Group controlId="formRepeatPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Repeat your password"
                      value={repeatPassword}
                      onChange={(e) => { handleRepeatPasswordChange(e); handleInputValidation(); }}
                      required
                    />
                    {doPasswordsMatch ? (
                      <div className="text-success password-feedback">
                        <i className="bi bi-check-circle"></i> Passwords match
                      </div>
                    ) : (
                      <div className="text-danger password-feedback">
                        <i className="bi bi-x-circle"></i> Passwords do not match
                      </div>
                    )}
                  </Form.Group>

                  <Button variant="primary" type="submit" block>
                    Sign Up
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                <Form noValidate validated={validated} onSubmit={handleLoginSubmit}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); handleInputValidation(); }}
                      required
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      Please provide a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); handleInputValidation(); }}
                      required
                    />
                    <Form.Control.Feedback type="invalid" className="access-feedback">
                      Please provide a password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit" block>
                    Log In
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        )}

        <div className="text-center mt-3">
          <Button variant="link" onClick={toggleForm}>
            {isSignup ? "Already have an account? Login now!" : "Don't have an account? Create now!"}
          </Button>
        </div>
      </DefaultModal>
    </div>
  );
}

export default AccessPage;