import React from 'react';
import {
    Row,
    Col,
    Button,
    Input
} from 'reactstrap';

export default function CreateComment() {

    const [CommentText, setCommentText] = React.useState(null);

    function handleClick() {
        alert("Comment has been added")
    }

    return (
        <Row>
            <Col lg={"11"} style={{marginLeft: "15px", marginBottom: "15px"}}>
                <Input
                    placeholder="Add comment..."
                    onChange = {(text) => setCommentText(text)}
                />
            </Col>
            <Col >
                <Button
                    color={"info"}
                    onClick={() => handleClick()}
                >Comment</Button>
            </Col>
        </Row>

    );
}