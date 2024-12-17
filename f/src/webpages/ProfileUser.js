import React, { useEffect, useState } from "react";
import Navbar from "../child/Navbar";
import '../style/musicplayerstyle.css';
import { Container, Row, Col, Card, ListGroup, Form, Button, Image } from "react-bootstrap";
import useFetchAccount from "../static/fetchAccount";
import { useParams } from "react-router-dom";
import { PFP, SONG } from "../static/getstring";
import axios from "axios";


export default function ProfileUser(){
    const {acc, err} = useFetchAccount();
    const [user, setUser] = useState();
    const [userUpload, setUserUpload] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [followed, isFollowed] = useState(false);
    const [follower, countFollower] = useState(0);
    const {id} = useParams();
    const filteredSongs = userUpload?.filter((song) =>
    song.songName.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    useEffect(() =>{
        axios.get(`http://localhost:8000/user/`+id)
        .then(res => {
            if (res.data.Status === "Success"){
                const fetchedAccount = res.data.data[0];
                setUser(fetchedAccount);
                countFollower(fetchedAccount.userFollower);
                axios.get(`http://localhost:8000/userupload/` + fetchedAccount.userID)
                .then(res =>{
                    if (res.data.Status === "Success"){
                        setUserUpload(res.data.data);
                    }
                });
                axios.get(`http://localhost:8000/followedUser/` + acc?.userID + "/" + fetchedAccount.userID)
                    .then(res =>{
                        if (res.data.data.length > 0)
                            isFollowed(true);
                    })
            }
        })
        .catch(e => {
            console.log(e);
        })
    }, [id,acc]);

    function handleFollowUser(e){
        e.preventDefault();
        if (user.userID && acc?.userID){
            const value = {
                accID: acc.userID,
                followID: user.userID
            }
            if (!followed){
                axios.post("http://localhost:8000/follow", value)
                .then(res => {
                    countFollower(follower + 1);
                })
                .catch(e => console.log(e));
            }
            else{
                axios.post("http://localhost:8000/unfollow", value)
                .then(res => {
                    countFollower(follower - 1);
                })
                .catch(e => console.log(e));
            }
        }
        isFollowed(!followed);
    }

    return(
        <>
            <Navbar/>
            <Container className="my-4">
            <Row className="mb-4 transparent-box">
                <Col md={4} className="text-center">
                <Image
                    src={PFP(user?.userPFP) || '/image/defaultpfp.jpg'}
                    alt="Avatar"
                    className="rounded-circle"
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                />
                </Col>
                <Col md={8}>
                <h5 className="text-muted">{user?.userNickname || user?.username}</h5>
                <p>{user?.userDescription || "Quá lười để ghi mô tả"}</p>
                {user?.userID !== acc?.userID && (
                    <p>
                    <Button variant="none" className="button me-3" onClick={handleFollowUser}>Theo dõi</Button>
                    <strong>{follower}</strong> lượt theo dõi
                    </p>
                )}                
                </Col>
            </Row>
            <Row className="mb-4">
                <Col>
                <Form.Control
                    type="text"
                    placeholder="Tìm kiếm bài hát..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                </Col>
            </Row>
            {/* Danh sách bài hát */}
            <h4>Các bài hát đã đăng tải</h4>
            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredSongs.length > 0 ? (
                filteredSongs.map((song) => (
                <Col key={song.id}>
                <div className="d-flex flex-row align-items-center p-3 border rounded shadow-sm">
                    <div className="me-3">
                    <Image
                        src={SONG(song.songImage)}
                        alt={song.songName}
                        className="img-fluid rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    </div>

                    {/* Nội dung bài hát */}
                    <div className="ms-3">
                    <h5 className="mb-1">{song.songName}</h5>
                    <p className="text-muted mb-2">
                        <i className="bi bi-headphones"></i> {song.songStream} lượt nghe
                    </p>
                    <Button
                        variant="none"
                        size="sm"
                        className="rounded-pill button"
                        href={"/listen/" + song.songID}
                    >
                        Nghe nhạc &gt;&gt;
                    </Button>
                    </div>
                </div>
                </Col>
                ))
                ) : (
                <p className="text-center">Không tìm thấy bài hát nào.</p>
                )}
            </Row>
            </Container>
        </>
    )
}