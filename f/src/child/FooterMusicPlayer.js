import React, { useEffect, useRef, useState } from "react";
import { AUDIO, PFP, SONG } from "../static/getstring";
import { faPlay, faPause, faRepeat, faVolumeUp, faInfo, faHeart as faHeartSolid, faMusic, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Button, Card, CardBody, CardTitle, Col, Image,} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { streamSong } from "../static/songStream";



export default function FooterMusicPlayer({music, onPrev, onNext}){
    const audio = useRef(null);
    const [isPlaying, setPlayState] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [musicTime, setMusicTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isRepeat, setRepeat] = useState(false);

    useEffect(() =>{
        playMusic();
    }, [music]);

    useEffect(() =>{
        streamSong(music.songID);
    },[]);

    function playMusic(){
        audio.current.play();
        setPlayState(true);
    }

    function pauseMusic(){
        audio.current.pause();
        setPlayState(false);
    }

    function handleTimeUpdate(){
        setCurrentTime(audio.current.currentTime);
      };
    
    function handleLoadedMetadata(){
        setMusicTime(audio.current.duration);
      };

    function handleSeek(event){
        const newTime = event.target.value;
        audio.current.currentTime = newTime;
        setCurrentTime(newTime);
      };

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    function handleVolumeChange(event){
        const newVolume = event.target.value;
        audio.current.volume = newVolume; 
        setVolume(newVolume); 
      };

    function handleRepeat() {
        setRepeat(!isRepeat);
    }

    function handleEnded() {
        if (isRepeat) {
            audio.current.currentTime = 0;
            audio.current.play();
        } else {
            setPlayState(false);
            onNext();
        }
    }

    return(
        <footer
            className="d-flex flex-column justify-content-center align-items-center transparent-box"
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                zIndex: 10,
                padding: "10px 20px",
                borderTop: "1px solid #444",
            }}
        >
            <div className="container">
                <div className="row align-items-center">
                    {/* Cột trái: Hình ảnh và tên bài hát */}
                    <div className="col-3 d-flex align-items-center">
                        <Image
                            src={music?.songImage? SONG(music?.songImage) :"/image/defaultsongimg.jpg"}
                            className="img-fluid rounded-circle"
                            style={{ width: "80px", height:"80px", objectFit:"cover", marginRight: "10px" }}
                        />
                        <p className="d-none d-sm-inline" style={{ margin: 0, fontSize: "14px" }}>{music?.songName}</p>
                    </div>

                    {/* Cột giữa: Chia thành hai hàng */}
                    <div className="col-6 d-flex flex-column align-items-center">
                        <audio
                                ref={audio}
                                src={AUDIO(music?.songPath) || "/music/her.mp3"}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleLoadedMetadata}
                                onEnded={handleEnded}
                            />
                        {/* Hàng 1: Các nút điều khiển (Play, Pause, Repeat) */}
                        <div className="d-flex justify-content-center align-items-center mb-2">
                            {!isPlaying ? (
                                <Button variant="none" className="btn-lg button" onClick={playMusic}>
                                    <FontAwesomeIcon icon={faPlay} />
                                </Button>
                            ) : (
                                <Button variant="none" className="btn-lg button" onClick={pauseMusic}>
                                    <FontAwesomeIcon icon={faPause} />
                                </Button>
                            )}
                            <Button
                                variant="none"
                                className="btn-lg button"
                                onClick={handleRepeat}
                                style={{ color: isRepeat ? "#fff" : "#888" }}
                            >
                                <FontAwesomeIcon icon={faRepeat} />
                            </Button>
                            <Button
                                variant="none"
                                className="btn-lg button"
                                onClick={onPrev}
                            >
                                <FontAwesomeIcon icon={faBackward} />
                            </Button>
                            <Button
                                variant="none"
                                className="btn-lg button"
                                onClick={onNext}
                            >
                                <FontAwesomeIcon icon={faForward} />
                            </Button>
                        </div>

                        {/* Hàng 2: Thanh điều khiển và thời gian */}
                        <div className="d-flex justify-content-center align-items-center">
                            <input
                                type="range"
                                className="form-range mx-3"
                                min="0"
                                max={musicTime || 0}
                                step="0.1"
                                value={currentTime}
                                onChange={handleSeek}
                                style={{ width: "100px" }}
                            />
                            <span style={{ fontSize: "12px" }}>
                                {formatTime(currentTime)} / {formatTime(musicTime)}
                            </span>
                        </div>
                    </div>

                    {/* Cột phải: Các nút tương tác */}
                    <div className="col-3 d-flex justify-content-end align-items-center">
                        <Button variant="none" className="btn-lg ms-2 d-none d-sm-inline">
                        <FontAwesomeIcon icon={faVolumeUp}/></Button>
                        <input
                            type="range"
                            className="form-range d-none d-sm-inline"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{ width: "80px" }}
                        />
                        <Button variant="none" className="btn-lg ms-2 button" href={"/listen/"+music.songID}>
                        <FontAwesomeIcon icon={faMusic}/>
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}