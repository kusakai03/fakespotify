import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
import axios from "axios";
import { GetLocalBE, PFP } from "../static/getstring";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Comment({comment}){
    const [like, setLike] = useState(0);
    useEffect(() =>{
        setLike(comment.cmtLike);
    },[]);
    function handleLikeComment(){
        const value = {
            cmtID: comment.cmtID
        };
        axios.post(GetLocalBE('/likecmt/'), value)
        .then(res => setLike(like + 1))
        .catch(e => console.log(e));
    }
    return(
        <Card className="card bg-body-tertiary border-0">
        <Row>
            <Col className="col-md-1 col-1 mt-1">
            <Link to={"/profile/" + comment.userID}>
            <CardImg className="rounded-circle ms-3 mt-3" src={comment?.userPFP ? PFP(comment.userPFP) : '/image/defaultpfp.jpg'} alt="" style={{width:40, height:40, objectFit:'cover'}}/>
            </Link>
            </Col>
            <Col className="col-md-10 col-10 ms-2">
                <CardBody>
                    <CardTitle className="fw-bold card-title">{comment.userNickname || comment.username}</CardTitle>
                    <CardText id="cutoff-text" className="card-text">{comment.cmt}</CardText>
                <CardText className="card-text text-secondary fw-light">{moment(comment.cmtDate).format('DD/MM/YYYY')} <span className="fw-lighter">{moment(comment.cmtDate).format('HH:mm')}</span></CardText>
                <Button variant="none" className="button" onClick={handleLikeComment}><FontAwesomeIcon icon={faHeartSolid}/> {like}</Button>
                </CardBody> 
                </Col>
                </Row>
                </Card>
    );
}