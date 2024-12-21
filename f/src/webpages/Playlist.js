import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, ListGroup, Button, Image, Container } from 'react-bootstrap';
import { faList, faPlay} from '@fortawesome/free-solid-svg-icons';
import { GetLocalBE, SONG } from "../static/getstring";
import axios from "axios";
import FooterMusicPlayer from "../child/FooterMusicPlayer";
import useFetchAccount from "../static/fetchAccount";
import Navpinkpink from "../child/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Playlist(){
    const {id} = useParams();
    const [playlist, setPlaylist] = useState();
    const [user, setUser] = useState();
    const [songs, setSongs] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSong, setCurrentSong] = useState();
    const {acc, err} = useFetchAccount();
    useEffect(() =>{
        if (id === 'likedsong'){
            axios.get(GetLocalBE('/likedsong/' + acc?.userID))
            .then(res => {
                setSongs(res.data.data);
                console.log(res.data.data);
                setUser(acc && acc);
            }
        );
        }
        else
        axios.get(GetLocalBE('/playlist/') + id)
        .then(res => {
            const pl = res.data.data[0];
            setPlaylist(pl);
            axios.get(GetLocalBE('/playlistsongs/') + id)
            .then(res => {
                setSongs(res.data.data);
            })
            .catch(err => console.error(err));
            axios.get(GetLocalBE('/user/') + pl.userID)
            .then(res => {
                setUser(res.data.data[0]);
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    },[id, acc])

    useEffect(() =>{
        handlePlaying(currentIndex);
    },[currentIndex]);

    function prevSong(){
        if (currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
        }
        console.log("cusc" + currentIndex);
    }

    function nextSong(){
        if (currentIndex < songs.length-1){
            setCurrentIndex(currentIndex + 1);
        }
        console.log("cuts" +currentIndex);
    }

    function handlePlaying(index){
        if (songs[index]) {
            axios.get(GetLocalBE('/music/') + songs[index].songID)
            .then(res => {
                setCurrentSong(res.data.data[0]);
            })
            .catch(e => console.log(e));
        }
    }

    return(
        <>
        <Navpinkpink/>
        <div className="container mt-4 transparent-box">
            <Container style={{ minHeight: "300px", padding: "20px", backgroundColor: "#f8f9fa", borderRadius: "10px" }}>
                <Row className="align-items-center mb-4">
                    <Col xs={12} md={3} className="text-center">
                        <Card.Img
                            variant="top"
                            src={
                                songs.length > 0
                                    ? (songs[0].songImage ? SONG(songs[0].songImage) : '/image/defaultsongimg.jpg')
                                    : '/image/astheticimg2.jpg'
                            }
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                            }}
                        />
                    </Col>
                    <Col xs={12} md={9}>
                        <Card.Body>
                            <Card.Title className="mb-2" style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
                                {id === "likedsong" ? "Các bài hát đã thích" : playlist?.playlistName}
                            </Card.Title>
                            <Card.Text className="mb-1" style={{ fontSize: "1rem", color: "#6c757d" }}>
                                Người tạo: <strong>{user?.userNickname || user?.username}</strong> - {songs?.length || 0} bài hát
                            </Card.Text>
                            <Button variant="none" size="lg" className="button" onClick={e => handlePlaying(0)}>
                                <FontAwesomeIcon icon={faPlay}/> Nghe
                            </Button>
                        </Card.Body>
                    </Col>
                </Row>

                {/* List of Songs */}
                <ListGroup className="mt-3">
                    {songs?.length > 0 ? (
                        songs.map((song, index) => (
                            <ListGroup.Item
                                key={index}
                                className="d-flex align-items-center justify-content-between"
                                style={{
                                    padding: "15px",
                                    borderBottom: "1px solid #e9ecef",
                                    backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    <Image
                                        src={song.songImage ? SONG(song.songImage) : '/image/defaultsongimg.jpg'}
                                        roundedCircle
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'cover',
                                            marginRight: '15px',
                                            border: "1px solid #dee2e6",
                                        }}
                                    />
                                    <div>
                                        <h5 className="mb-1" style={{ fontSize: "1.1rem", fontWeight: "500" }}>{song.songName}</h5>
                                        <small className="text-muted">
                                            {song.songArtist} • {song.songGenre}
                                        </small>
                                    </div>
                                </div>
                                <Button variant="none" className="button" size="sm" onClick={() => handlePlaying(index)}>
                                    <FontAwesomeIcon icon={faPlay}/>
                                </Button>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item className="text-center" style={{ padding: "20px" }}>
                            <h5 className="text-muted">Danh sách trống</h5>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Container>
        </div>
        {currentSong && <FooterMusicPlayer music={currentSong} onPrev={prevSong} onNext={nextSong}/>}
        </>
    );
}