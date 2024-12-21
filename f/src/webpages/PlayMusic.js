import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faPlay, faPause, faRepeat, faVolumeUp, faInfo, faComment, faHeart as faHeartSolid, faShare, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Button, Card, CardBody, CardText, CardTitle, Col, Form, FormControl, Image, Row } from "react-bootstrap";
import '../style/musicplayerstyle.css';
import moment from 'moment';
import { Link, useParams } from "react-router-dom";
import useFetchAccount from "../static/fetchAccount";
import { AUDIO, GetLocalBE, PFP, SONG } from "../static/getstring";
import axios from "axios";
import Comment from "../child/Comments";
import AddSongToPlaylist from "../child/AddSongToPlaylist";
import { streamSong } from "../static/songStream";

export default function PlayMusic() {
    const {id} = useParams();
    const audio = useRef(null);
    const likeButtonRef = useRef(null);
    const [cmt, setCmt] = useState([]);
    const [urcmt, addurcmt] = useState('');
    const [uploadUser, setUploadUser] = useState();
    const [music, setMusic] = useState();
    const [isPlaying, setPlayState] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [musicTime, setMusicTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [likeCount, setLikeCount] = useState(0);
    const [isRepeat, setRepeat] = useState(false);
    const [isShowingLyrics, showLyrics] = useState(false);
    const [isShowingInfo, showInfo] = useState(false);
    const [isLiked, like] = useState(false);
    const [showingAddplaylist, showAddplaylist] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [isStream, setStream] = useState(0);
    const { acc, error } = useFetchAccount();

    useEffect(() => {
        axios.get(`http://localhost:8000/music/`+id)
          .then(response => {
            const data = response.data.data[0];
            setMusic(data);
            loadComment(id);
            setLikeCount(data.songLike);
            axios.get('http://localhost:8000/user/' + data.userID)
            .then(response => {
                setUploadUser(response.data.data[0]);
                if (acc) {
                    axios.get(`http://localhost:8000/likedmusic/` + acc.userID + "/" + data.songID)
                    .then(res => {
                        if (res.data.data.length > 0) 
                            like(true);
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Có lỗi xảy ra:', error);
            });
        })
          .catch(error => {
            console.error('Có lỗi xảy ra:', error);
          });
      }, [id,acc]);

    useEffect(() =>{
        if (isStream < 1){
            streamSong(id);
            setStream(isStream + 1);
        }
    },[]);

    function loadComment(songID){
        axios.get(GetLocalBE('/comments/' + songID))
        .then(res =>{
            setCmt(res.data.data);
        })
    }

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

    function handleShowingLyrics(){
        showLyrics(!isShowingLyrics);
    }

    function handleShowingInfo(){
        showInfo(!isShowingInfo);
    }

    function handleComment(){
        const value ={
            songID: music.songID,
            userID: acc.userID,
            cmt: urcmt
        }
        axios.post(GetLocalBE("/addcmt"), value)
        .then(res => {
            loadComment(value.songID);
        })
        .catch(e => console.log(e));           
    }

    function handleEnded() {
        if (isRepeat) {
            audio.current.currentTime = 0;
            audio.current.play();
        } else {
            setPlayState(false);
        }
    }

    function handleLike() {
        const buttonRect = likeButtonRef.current.getBoundingClientRect();
        const newHeart = {
            id: Date.now(),
            startX: buttonRect.left + window.scrollX + buttonRect.width / 2,
            startY: buttonRect.top + window.scrollY + buttonRect.height / 2,
        };
        if (acc){
            if (music.songID && acc.userID){
                const value = {
                    songID: music.songID,
                    userID: acc.userID
                }
            if (!isLiked){
            setHearts([...hearts, newHeart]);
            axios.post("http://localhost:8000/like", value)
                .then(res => {
                    setLikeCount(likeCount + 1);
                })
                .catch(e => console.log(e));
            }
            else{
                axios.post("http://localhost:8000/dislike", value)
                .then(res => {
                    setLikeCount(likeCount - 1);
                })
                .catch(e => console.log(e));
            }
        }
        like(!isLiked);
        setTimeout(() => {
            setHearts((hearts) => hearts.filter((heart) => heart.id !== newHeart.id));
        }, 1000); // Tim sẽ biến mất sau 1 giây
    }
}
    

  return (
    <div className="container-fluid d-flex justify-content-center" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="heart-animation"
                    style={{
                        position: 'absolute',
                        left: `${heart.startX}px`,
                        top: `${heart.startY}px`,
                    }}
                >
                    <FontAwesomeIcon icon={faHeartSolid} />
                </div>
            ))}
        </div>
        <Row>
            <Col className={`col-12 col-xl-6`}>
            <Card className="w-100">
                <CardBody>
                    <CardTitle className="d-flex justify-content-center">{music?.songName}</CardTitle>
                    <Image src={music?.songImage? SONG(music?.songImage) : "/image/defaultsongimg.jpg"} className="mt-5 mb-5 round-image" style={{width:"300px", height:"300px", objectFit:'cover'}}/>
                    <audio ref={audio} 
                        src={AUDIO(music?.songPath)||"/music/her.mp3" }
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleEnded}
                        />
                    <Button variant="none" onClick={handleShowingLyrics}>LYRICS</Button>
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
                        {!isPlaying?(
                            <Button variant="none" className="btn-lg button" onClick={playMusic}>
                                <FontAwesomeIcon icon={faPlay} />
                            </Button>
                        ):(
                            <Button variant="none" className="btn-lg button" onClick={pauseMusic}>
                                <FontAwesomeIcon icon={faPause} />
                            </Button>
                        )
                        }   
                        <Button variant="none" className="btn-lg ms-2 button"
                            onClick={handleRepeat}
                        >
                            <FontAwesomeIcon icon={faRepeat} className={isRepeat ?  "text-light" : "text-dark"}/>
                        </Button>  
                        <Button variant="none" className="btn-lg ms-2">
                            <FontAwesomeIcon icon={faVolumeUp}/></Button>
                        <input
                            type="range"
                            className="form-range volume-short mt-4"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                        /> 
                        <Button variant="none" className="button btn-lg ms-2" onClick={handleShowingInfo}><FontAwesomeIcon icon={faInfo}/></Button>
                        <Button variant="none" className="button btn-lg ms-2" onClick={handleLike} ref={likeButtonRef}>
                            <FontAwesomeIcon icon={isLiked? faHeartSolid: faHeartRegular}/> {likeCount}</Button>
                    </div>
                </CardBody>
            </Card>
            </Col>
            <Col
                className={`col-12 col-xl-6 hidden-scroll ${isShowingLyrics ? "visible" : "hidden"}`}
                style={{ maxHeight: 600, overflowY: "auto" }}
            >
                <Card>
                <CardBody>
                    <CardTitle className="mt-3">Lời bài hát</CardTitle>
                    <pre style={{fontFamily: "inherit"}}>{music?.songLyric}</pre>
                </CardBody>
                </Card>
            </Col>
            <Col className={`col-12 col-xl-6 ${isShowingInfo ? "visible" : "hidden"}`}>
                <Card>
                <div className="d-flex m-3">
                    <Image
                    className="rounded-circle"
                    src={music?.songImage? SONG(music?.songImage) : "/image/defaultsongimg.jpg"}
                    alt=""
                    style={{ width: 40, height: 40, objectFit:'cover'}}
                    />
                    <div className="m-2">
                    <strong>{music?.songName}</strong>
                    </div>
                </div>
                <div className="m-3">
                    <div>Nguời hát: {music?.songArtist}</div>
                    <div>Người đăng tải: <Link className="text-decoration-none button" to={'/profile/'+uploadUser?.userID}>{uploadUser?.userNickname || uploadUser?.username}</Link></div>
                    <div>Ngày đăng tải: {moment(music?.uploadDate).format('DD/MM/YYYY')} 
                        <span className="fw-lighter"> {moment(music?.uploadDate).format('HH:mm')}</span>
                        </div>
                    <div>Thể loại nhạc: {music?.songGenre}</div>
                    <div style={{ fontSize: '24px'}} className="mt-3">
                    <FontAwesomeIcon icon={faComment} />  {cmt.length}   
                    &nbsp;
                    <FontAwesomeIcon icon={faShare} />  0
                    &nbsp;
                    <FontAwesomeIcon icon={faHeadphones}/>  {music?.songStream}
                    {acc &&<Button variant="none" className="button ms-3" onClick={() => showAddplaylist(true)}>
                        <FontAwesomeIcon icon={faList}/>
                         &nbsp;Thêm vào playlist
                    </Button>}
                    </div>
                </div>
                </Card>
            </Col>
            <AddSongToPlaylist acc={acc && acc} songID={music?.songID} show={showingAddplaylist}
            handleClose={() => showAddplaylist(false)}/>            
            <Col className={`col-12 col-xl-6 ${isShowingInfo ? "visible" : "hidden"}`}>
                <div className="comment-section border card" id="comment-section">
                    <div className="p-2">
                        {acc && (
                            <Form>
                                <div className="d-flex flex-row align-items-start">
                                    {acc && <Image className="rounded-circle" src={acc?.userPFP ? PFP(acc.userPFP) : '/image/defaultpfp.jpg'} width="40" height="40" style={{objectFit:"cover"}}/>}
                                    <FormControl className="ms-1 shadow-none textarea" name="cmt" placeholder="Bình luận..." onChange={(e) => addurcmt(e.target.value)} />
                                    <Button className="button shadow-none" onClick={handleComment} variant="none">Gửi</Button>
                                </div>
                            </Form>
                        )}
                    </div>
                    <div className="overflow-y-scroll" style={{ height: '530px', overflowX: 'hidden' }}>
                        {cmt.length > 0 ? (
                            cmt.map((comment, index) => (
                                <Comment key={index} comment={comment}/>
                            ))
                        ) : <div className="d-flex justify-content-center">Không có bình luận</div>}
                    </div>
                </div>
            </Col>
        </Row>
    </div>
  );
}
