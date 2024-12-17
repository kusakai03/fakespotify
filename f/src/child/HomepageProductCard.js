import React from "react";
import { Card, CardImg, CardText, CardTitle } from "react-bootstrap";
import { SONG } from "../static/getstring";

export default function HomeProductCard({selectedID, music}){
    return(
        <Card className="ms-3 me-3" style={{width:"200px"}} onClick={e =>selectedID(music?.songID)}>
            <CardImg src={SONG(music?.songImage) || "/image/defaultsongimg.jpg"} style={{ width: "200px", height: "200px", objectFit: "cover" }}></CardImg>
            <CardTitle className="m-3">{music?.songName}</CardTitle>
            <CardText className="m-3">{music?.songArtist}</CardText>
            <CardText className="m-3">{music?.userNickname || music?.username}</CardText>
        </Card>
    )
}