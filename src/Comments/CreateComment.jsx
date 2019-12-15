import React from 'react';
import {
    Row,
    Col,
    Button,
    Input
} from 'reactstrap';

export default function CreateComment() {

    return (
        <Row style={{margin: "15px"}}>
            <Input
                placeholder="Add comment..."
            />
        </Row>
    );
}