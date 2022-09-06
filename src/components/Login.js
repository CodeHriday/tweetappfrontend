import { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import { login } from "../service.ts";
import { useNavigate } from "react-router-dom"

function Login({ setIsLoggedIn }) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();
  const [showAuthError, setShowAuthError] = useState(false);

  async function onSubmitHandler(e) {
    e.preventDefault();
    const response = await login(userName, password);

    if (response.status === 401) {
      setShowAuthError(true);
      return;
    }

    const key = await response.json();
    localStorage.setItem("access-token", key["access-token"]);
    localStorage.setItem("refresh-token", key["refresh-token"]);

    var base64Url = key["access-token"].split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const json = await JSON.parse(jsonPayload);

    localStorage.setItem("user", json["sub"]);
    setIsLoggedIn(true);
    history("/tweets");
  }
  return (
    <Form onSubmit={onSubmitHandler}>
      <Form.Group className="mb-3" >
        <Form.Label>User Name</Form.Label>
        <Form.Control value={userName} onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Enter your user name" required />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required />
      </Form.Group>
      {showAuthError && <div className="text-danger mb-2">Invalid Credentials</div>}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default Login