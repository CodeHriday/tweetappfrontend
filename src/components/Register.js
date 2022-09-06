import { useEffect, useRef, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { isUsernameExist, register } from '../service.ts';

function Register() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [resetKey, setResetKey] = useState('');

    const confirmPasswordRef = useRef(null);
    const userNameRef = useRef(null);
    async function onSubmitHandler(e) {
        e.preventDefault();
        if (!confirmPasswordRef.current.classList.contains('is-invalid') && !confirmPasswordRef.current.classList.contains('is-invalid')) {
            register({
                firstName,
                lastName,
                email,
                username: loginId,
                password,
                resetKey
            })
        }
    }

    useEffect(() => {
        if (confirmPassword !== password) {
            confirmPasswordRef.current.classList.remove('is-valid');
            confirmPasswordRef.current.classList.add('is-invalid');
        } else {
            confirmPasswordRef.current.classList.remove('is-invalid');
            confirmPasswordRef.current.classList.add('is-valid');
        }
    }, [confirmPassword])

    useEffect(() => {
        const t = setTimeout((async () => {
            const bool = await isUsernameExist(loginId);
            if (bool && userNameRef.current.value !== '') {
                userNameRef.current.classList.remove('is-valid');
                userNameRef.current.classList.add('is-invalid');
            } else if (!bool && userNameRef.current.value !== '') {
                userNameRef.current.classList.remove('is-invalid');
                userNameRef.current.classList.add('is-valid');
            }
        }), 3000);

        return (() => clearTimeout(t));
    }, [loginId])
    return (
        <Form onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="Enter your first name" pattern='[aA-zZ]{1,12}' required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Enter your last name" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your e-mail" required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Login Id</Form.Label>
                <Form.Control ref={userNameRef} value={loginId} onChange={(e) => setLoginId(e.target.value)} type="text" placeholder="Choose your login id" pattern='([aA-zZ_.]){5,12}' required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Choose your password" pattern='.{6,12}' required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control value={confirmPassword} ref={confirmPasswordRef} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm your password" required />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Reset Phrase</Form.Label>
                <Form.Control value={resetKey} onChange={(e) => setResetKey(e.target.value)} type="text" placeholder="Choose your reset phrase" pattern='.{6,12}' required />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>

    )
}

export default Register