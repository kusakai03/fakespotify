import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { GetLocalBE, SONG } from "../static/getstring";
import { Link } from "react-router-dom";

export default function PlaylistCard({playlistID}){
    const [playlist, setPlaylist] = useState();
    const [songs, setSongs] = useState([]);
    useEffect(() =>{
        axios.get(GetLocalBE('/playlist/') + playlistID)
        .then(res =>{
            const pl = res.data.data[0];
            setPlaylist(pl);
            axios.get(GetLocalBE('/playlistsongs/') + playlistID)
            .then(res =>{
                setSongs(res.data.data);
            })
        })
    },[])
    
    return(
        <Card className="card border rounded p-3 h-75">
        <Link to={"/playlist/" + playlist?.playlistID}> 
        <Card.Img
            src={songs.length > 0 
                ? (songs[0].songImage ? SONG(songs[0].songImage) : '/image/defaultsongimg.jpg') 
                : '/image/astheticimg2.jpg'}            
            alt="newplaylist"
            style={{width:"auto", height: "200px", objectFit: "cover" }}
        /></Link>
        <h5 className="mt-3" style={{textOverflow: 'ellipsis'}}>{playlist?.playlistName}</h5>
        <p>{songs.length} bài hát</p>
        </Card>
    )
}