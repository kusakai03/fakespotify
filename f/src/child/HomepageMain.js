import React, { useEffect, useState } from "react";
import HomeProductCard from "./HomepageProductCard";
import axios from "axios";
import { GetGenres, GetLocalBE, SONG } from "../static/getstring";
import { Button, Container, Row, Col, Form, ListGroup, Image } from 'react-bootstrap';
import FooterMusicPlayer from "./FooterMusicPlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadphones, faPlay } from "@fortawesome/free-solid-svg-icons";

export default function HpageMain(){
    const [song, setPlaying] = useState();
    const [allMusic, setAllMusic] = useState([]);
    const [playlist, setPlayList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const genres = GetGenres();
    const [selectedGenre, setSelectedGenre] = useState('Pop');
    const [sortOption, setSortOption] = useState('uploadDate');
    const [songsGenre, setSongsGenre] = useState([]);
    useEffect(() =>{
        axios.get(GetLocalBE('/allmusic'))
        .then(res =>{
            setAllMusic(res.data.data);
        }).catch(e => console.log(e));
    }, []);

    useEffect(() =>{
        playMusic(playlist[currentIndex]?.songID);
    },[currentIndex, playlist]);

    useEffect(() => {
        if (selectedGenre && sortOption) {
            updateSongSort();
        }
    }, [selectedGenre, sortOption]);

    function updateSongSort(){
        axios.get(GetLocalBE('/songgenre/'+selectedGenre + '/' + sortOption))
        .then(response => {
            setSongsGenre(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }

    function setSort(option){
        setSortOption(option);
        updateSongSort();
    };

    function setGenrePlaylist(index){
        setCurrentIndex(index);
        playMusic(songsGenre[index].songID);
        if (playlist !== songsGenre){
            setPlayList(songsGenre);
        }
    }
    
    function setNewestPlaylist(id) {
        if (allMusic !== playlist) {
            setPlayList(allMusic);
        }
        // Đảm bảo phát bài hát mới
        const newIndex = allMusic.findIndex(m => m.songID === id);
        setCurrentIndex(newIndex);
        playMusic(id);
    }
    

    function prevSong(){
        if (currentIndex > 0){
            setCurrentIndex(currentIndex - 1);
        }
        console.log("cusc" + currentIndex);
    }

    function nextSong(){
        if (currentIndex < playlist.length-1){
            setCurrentIndex(currentIndex + 1);
        }
        console.log("cuts" +currentIndex);
    }

    function playMusic(id){
        axios.get(GetLocalBE('/music/')+ id)
        .then(res =>{
            setPlaying(res.data.data[0]);
        })
        .catch(e => console.log(e));
    }
    return(
        <div>
        <div id="newestUpload">
            <h1 className="pink pt-3 ps-3">KIỆT TÁC ÂM NHẠC MỚI NHẤT</h1>
            <div style={{overflowX:"auto"}} className="d-flex">
                {
                    allMusic.map((m, index) => {
                        return <HomeProductCard selectedID={setNewestPlaylist} music={m} key={index} />
                    })
                }
            </div>
        </div>
        {song && <FooterMusicPlayer music={song} onPrev={prevSong} onNext={nextSong}/>}
        <Container>
        <h1 className="pink pt-3 ps-3">THỂ LOẠI ÂM NHẠC</h1>
            <Row className="mb-3 align-items-center">
                <Col xs={12} md={6} className="mb-2">
                    <Form.Control 
                        as="select" 
                        value={selectedGenre} 
                        onChange={(e) => setSelectedGenre(e.target.value)}
                    >
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </Form.Control>
                </Col>
                <Col xs={12} md={6} className="mb-2 d-flex justify-content-md-end">
                    <Button 
                        variant='none'
                        onClick={() => setSort('uploadDate')} 
                        className="me-2 button"
                    >
                        Mới nhất
                    </Button>
                    <Button 
                        variant='none'
                        onClick={() => setSort('songStream')}
                        className="me-2 button"
                    >
                        Nóng nhất
                    </Button>
                </Col>
            </Row>

            <Row>
                <div style={{overflowY:'auto', maxHeight:500}} className="mb-3">
            {songsGenre?.length > 0 ? (
                songsGenre.map((song, index) => (
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
                        <div><FontAwesomeIcon icon={faHeadphones}/>  {song.songStream}</div>
                        <Button variant="none" className="button" size="sm" onClick={() => setGenrePlaylist(index)}>
                            <FontAwesomeIcon icon={faPlay}/>
                        </Button>
                    </ListGroup.Item>
                ))
            ) : (
                <ListGroup.Item className="text-center" style={{ padding: "20px" }}>
                    <h5 className="text-muted">Danh sách trống</h5>
                </ListGroup.Item>
            )}
            </div>
            </Row>
        </Container>
        </div>
    )
}