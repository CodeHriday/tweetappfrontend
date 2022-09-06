import { useEffect, useState, useRef } from 'react';
import { Card, Col, Row, Container, Button, InputGroup, Form } from 'react-bootstrap'
import { loadTweet, updateTweet, replyTweet, deleteTweet, likeTweet } from '../service.ts';
import logo from '../logo.svg'
import ConfirmationModal from './ConfirmationModal';
function Tweet({ data, currentUser }) {

    const [reply, setReply] = useState('');
    const [time, setTime] = useState('');
    const [tweet, setTweet] = useState('');
    const tweetInputRef = useRef(null);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showUpdateInput, setShowUpdateInput] = useState(false);
    const [showModal, setShowModal] = useState(false);


    function onSubmitHandler(e) {
        e.preventDefault();
        if (!/[\w ]+|(#[\w]{1,50})+/.test(tweet)) {
            tweetInputRef.current.classList.add('is-invalid')
        } else {
            tweetInputRef.current.classList.remove('is-invalid')
            let listOfTag = tweet.match(/#[\w]{1,50}/g);
            listOfTag = (listOfTag === null) ? null : listOfTag.map((e) => e.replace('#', ''))
            console.log(data.id, tweet, listOfTag)
            showUpdateInput ? updateTweet(data.id, tweet, listOfTag) : replyTweet(data.id, tweet, listOfTag);
        }
    }

    useEffect(() => {
        setTweet(() => showUpdateInput ? data['tweet'] : '')
    }, [showReplyInput, showUpdateInput])

    useEffect(() => {
        (async () => {
            if (data.repliedTo !== null) {
                const replyToTweet = await loadTweet(data.repliedTo);
                setReply(() => replyToTweet["tweet"]);
            }
            const currentTime = new Date()
            const createdTime = new Date(data.postTime * 1000);
            const difference = currentTime - createdTime;
            if (difference / 1000 < 60) {
                setTime(Math.floor(difference / 1000) + "s")
            } else if ((difference / (1000 * 60)) < 60) {
                setTime(Math.floor(difference / (1000 * 60)) + "m");
            } else if ((difference / (1000 * 60 * 60)) < 24) {
                setTime(Math.floor(difference / (1000 * 60 * 60)) + "h");
            } else if ((difference / (1000 * 60 * 60 * 24)) < 30) {
                setTime(Math.floor(difference / (1000 * 60 * 60 * 24)) + " days");
            } else if ((difference / (1000 * 60 * 60 * 24 * 30)) < 30) {
                setTime(Math.floor(difference / (1000 * 60 * 60 * 24 * 30)) + " months");
            } else {
                setTime(Math.floor(difference / (1000 * 60 * 60 * 24 * 365)) + " years");
            }
        })()
    }, [])
    return (
        <>
            <Card className='my-2' body>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs="auto"><img alt='profile' src={logo} width="60"
                            height="60" /></Col>
                        <Col xs="auto">
                            <Row>
                                <Col>@{data.username}</Col>
                                <Col>{time} ago</Col>
                            </Row>
                            <Row>
                                <Col>
                                    {data["repliedTo"] && <Row>
                                        "{reply}"
                                    </Row>}
                                    <Row>
                                        {data.tweet}
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div>
                        <Button className='mx-2' onClick={() => { likeTweet(data['id']) }}> Like </Button>
                        <Button className='mx-2' onClick={() => { setShowUpdateInput(false); setShowReplyInput(() => !showReplyInput) }}> Reply </Button>
                        {data["username"] === currentUser && <Button className='mx-2' onClick={() => setShowModal(true)} > Delete </Button>}
                        {data["username"] === currentUser && <Button className='mx-2' onClick={() => { setShowReplyInput(false); setShowUpdateInput(() => !showUpdateInput) }}> Edit </Button>}
                    </div>
                    {(showReplyInput || showUpdateInput) && <div>
                        <Form onSubmit={onSubmitHandler}>
                            <InputGroup className='my-2'>
                                <InputGroup.Text>Tweet</InputGroup.Text>
                                <Form.Control ref={tweetInputRef} value={tweet} onChange={(e) => setTweet(e.target.value)} as="textarea" aria-label="Enter your Tweet" maxLength={144} required />
                            </InputGroup>
                            <Button onClick={onSubmitHandler} variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>}
                </Container>
            </Card>
            <ConfirmationModal show={showModal} message={"Want to delete the following tweet"} tweet={data['tweet']} setShow={setShowModal} onConfirm={() => { deleteTweet(data['id']); setShowModal(false); }} />
        </>
    )
}


export default Tweet;