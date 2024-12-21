import Navbar from "../child/Navbar";
import Sidebar from "../child/Sidebar";
import React, { useEffect, useRef, useState } from "react";
import { faPlay, faPause, faRepeat, faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Row, Col, Card, CardTitle, CardBody, Image } from "react-bootstrap";
import { GetGenres, GetLocalBE } from "../static/getstring";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetchAccount from "../static/fetchAccount";
import { useNavigate } from "react-router-dom";

export default function UploadMusic(){
    const audio = useRef(null);
    const [isPlaying, setPlayState] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [musicTime, setMusicTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isRepeat, setRepeat] = useState(false);
    const [audioFile, setAudioFile] = useState("");
    const [audioSrc, setAudioSrc] = useState("");
    const [audioName, setAudioName] = useState("");
    const [artistName, setArtistName] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [genre, setGenre] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const genres = GetGenres();
    const {acc, err} = useFetchAccount();
    const nav = useNavigate();

    const filteredGenres = genres.filter(g => 
        g.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (!acc) {
            const timer = setTimeout(() => {
                if (!acc) {
                    nav('/');
                }
            }, 500);
    
            return () => clearTimeout(timer); 
        }
    }, [acc, nav]);
    
    function playMusic() {
        if (audio.current.readyState >= 3) {
            audio.current.play();
            setPlayState(true);
        } else {
            audio.current.oncanplaythrough = () => {
                audio.current.play();
                setPlayState(true);
            };
        }
    }
    

    function pauseMusic(){
        audio.current.pause();
        setPlayState(false);
    }

    function handleTimeUpdate(){
        setCurrentTime(audio.current.currentTime);
      };
    
    function handleLoadedMetadata() {
        setMusicTime(audio.current.duration);
    }
    
    function handleAudioUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const fileSizeInMB = file.size / (1024 * 1024);
            if (fileSizeInMB <= 10){
                const objectUrl = URL.createObjectURL(file); 
                setAudioFile(objectUrl);
                setAudioSrc(file);
                audio.current.src = objectUrl; 
                audio.current.load();
            }
        }
    }    
    
  
    function handleImageUpload(event){
      setCoverImage(event.target.files[0]);
    };
  
    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    function handleEnded() {
        if (isRepeat) {
            audio.current.currentTime = 0;
            audio.current.play();
        } else {
            setPlayState(false);
        }
    }

    function handleVolumeChange(event){
        const newVolume = event.target.value;
        audio.current.volume = newVolume; 
        setVolume(newVolume); 
      };

    function handleRepeat() {
        setRepeat(!isRepeat);
    }

    function handleSeek(event){
        const newTime = event.target.value;
        audio.current.currentTime = newTime;
        setCurrentTime(newTime);
      };

    function removeGenre(genreToRemove){
        setGenre(genre.filter((genre) => genre !== genreToRemove));
      };

    function checkValidData(){
        const valid = true;
        if (audioSrc === null) valid = false;
        if (audioName.length < 1) valid = false;
        if (artistName.length < 1) valid = false;
        return valid;
    }

    function handleSubmit(event){
      event.preventDefault();
      if (checkValidData()){
        const formData = new FormData();
        formData.append("audioFile", audioSrc);
        formData.append("audioName", audioName);
        formData.append("artistName", artistName);
        formData.append("lyrics", lyrics);
        formData.append("genre", genre.join(", "));
        formData.append("coverImage", coverImage);
        formData.append("userID", acc.userID);
        console.log(audioSrc);
        const path = "http://localhost:8000/uploadmusic";
        axios.post(path, formData)
        .then(res => {
            nav('/profile/' + acc.userID);
          }
          )
          .catch(e => console.log(e));
        }
    };
    return(
        <>
        <Navbar/>
        <Row>
            <Col className="col-2 col-xl-2">
            <Sidebar/>
            </Col>
            <Col className="col-10 col-xl-5">
            <Card className="p-4">
                <Form method="post" encType="multipart/form-data">
                    <Form.Group className="mb-3" controlId="formAudioFile">
                    <Form.Label>Chọn file âm thanh (không quá 10MB)</Form.Label>
                    <Form.Control type="file" accept="audio/*" onChange={handleAudioUpload} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formAudioName">
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên nhạc"
                        value={audioName}
                        onChange={(e) => setAudioName(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formArtistName">
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên ca sĩ"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLyrics">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Nhập lời nhạc"
                        value={lyrics}
                        onChange={(e) => setLyrics(e.target.value)}
                    />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGenre">
                        <Form.Label>Thể loại nhạc</Form.Label>
                        
                        {/* Search input */}
                        <Form.Control 
                            type="text" 
                            placeholder="Tìm kiếm thể loại..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                        />

                        <Form.Select
                            multiple
                            value={genre} // genre will be an array
                            onChange={(e) => {
                                const selectedOption = e.target.value;
                                if (!genre.includes(selectedOption))
                                setGenre([...genre,selectedOption]);
                            }}
                        >
                            {
                                filteredGenres.map((g) => (
                                    <option key={g} value={g}>{g}</option>
                                ))
                            }
                        </Form.Select>
                    </Form.Group>
                    {genre.map((gen, index) => (
                        <Button className="button" variant="none" key={index} onClick={() => removeGenre(gen)}>
                        {gen} X
                        </Button>
                    ))}
                    <Form.Group className="mb-3" controlId="formCoverImage">
                    <Form.Label>Chọn ảnh nhạc</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
                    </Form.Group>

                    <Button variant="none" className="button"  onClick={handleSubmit}>
                    Đăng tải
                    </Button>
                </Form>
                </Card>
            </Col>
            <Col className="col-12 col-xl-5">
                <Card className="w-100">
                    <CardBody>
                        <CardTitle className="d-flex justify-content-center">{audioName || 'Nhập tên bài hát'}</CardTitle>
                        <p className="text-center">{artistName || 'Ca sĩ ẩn danh'}</p>
                        <p className="text-center">{genre.length > 0 ? genre.join(", ") : 'Chọn thể loại nhạc'}</p>
                        <Image src={coverImage ? URL.createObjectURL(coverImage) : '/image/defaultsongimg.jpg'} className="mt-5 mb-5 round-image" style={{width:"300px", height:"300px",objectFit: 'cover'}}/>
                        <audio ref={audio} 
                            src={audioFile? audioFile : "/music/her.mp3"} 
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={handleEnded}
                        />
                        <input
                            type="range"
                            className="form-range my-3"
                            min="0"
                            max={musicTime || 0}
                            step="0.1"
                            value={currentTime}
                            onChange={handleSeek}
                        />
                        <p>
                            {formatTime(currentTime)} / {formatTime(musicTime)}
                        </p>
                        <div className="mt-3 d-flex justify-content-center">
                            {!isPlaying ? (
                                <Button variant="none" className="btn-lg button" onClick={playMusic}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </Button>
                            ) : (
                                <Button variant="none" className="btn-lg button" onClick={pauseMusic}>
                                    <FontAwesomeIcon icon={faPause} />
                                </Button>
                            )}
                            <Button variant="none" className="btn-lg ms-2 button" onClick={handleRepeat}>
                                <FontAwesomeIcon icon={faRepeat} className={isRepeat ? "text-light" : "text-dark"}/>
                            </Button>
                            <Button variant="none" className="btn-lg ms-2">
                                <FontAwesomeIcon icon={faVolumeUp} />
                            </Button>
                            <input
                                type="range"
                                className="form-range volume-short mt-4"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        </>
    );
}