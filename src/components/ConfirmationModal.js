import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react'
function ConfirmationModal({ show, setShow, tweet, message, onConfirm }) {

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Are you sure?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div><p>{message}</p></div>
                {tweet && <div><p>{tweet}</p></div>}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>No</Button>
                <Button variant="primary" onClick={onConfirm}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal;