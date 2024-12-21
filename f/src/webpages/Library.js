import React, { useEffect, useState } from "react";
import Navpinkpink from "../child/Navbar";
import Sidebar from "../child/Sidebar";
import { Container, Row, Col, ListGroup, Button, Image, Card, CardImgOverlay } from "react-bootstrap";
import axios from "axios";
import { GetLocalBE, PFP, PLAYLIST } from "../static/getstring";
import useFetchAccount from "../static/fetchAccount";
import AddPlaylistModal from "../child/AddPlaylistModal";
import PlaylistCard from "../child/PlaylistCard";

export default function Library(){
    const [playlists, setPlaylists] = useState([]);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const {acc, err} = useFetchAccount();
    useEffect(() =>{
        updatePlaylist();
        axios.get(GetLocalBE('/allfolloweduser/' + acc?.userID))
        .then(res => {
            setFollowedUsers(res.data.data);
        }).catch(e => console.log(e));
    },[acc]);

    function updatePlaylist(){
        axios.get(GetLocalBE('/userplaylists/' + acc?.userID))
        .then(res => {
            if (res.data.Status === "Success"){
                setPlaylists(res.data.data);
            }
        })
    }

    return(
        <>
        <Navpinkpink/>
        <Row>
            <Col className="col-2">
            <Sidebar/>
            </Col>
            <AddPlaylistModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                acc = {acc && acc}
                onUpdate={updatePlaylist}
            />
            <Col className="col-10">
            <Container className="mt-4 transparent-box">
            <h2 className="mb-3">Tổng hợp danh sách phát của bạn</h2>
                <div style={{overflowY:"auto", maxHeight:"400px"}}>
                <Row>
                <Col className="mb-4 col-12 col-xl-3">
                    <Card className="card border rounded p-3 h-75">
                    <Card.Img
                        src="/image/astheticimg.jpg"
                        alt="liked"
                        style={{width:"auto", height: "150px", objectFit: "cover" }}
                    />
                    <h5 className="mt-3">Các bài hát đã thích</h5>
                    <Button variant="none" className="button" href={"/playlist/likedsong"}>
                        Xem
                    </Button>
                    </Card>
                    </Col>
                <Col className="mb-4 col-12 col-xl-3">
                <Card className="card border rounded p-3 h-75">
                    <Card.Img
                        src="/image/astheticimg2.jpg"
                        alt="newplaylist"
                        style={{width:"auto", height: "200px", objectFit: "cover" }}
                    />
                    <Button variant="none" className="button" onClick={() => setShowModal(true)}>
                        Tạo danh sách phát mới
                    </Button>
                    </Card>
                </Col>
                {
                    playlists.length > 0 && (
                        playlists.map((pl, index) => {
                            if (pl.playlistPublic === 1) {
                                return (
                                    <Col className="mb-4 col-12 col-xl-3" key={index}>
                                        <PlaylistCard playlistID={pl.playlistID} />
                                    </Col>
                                );
                            }
                            return null;
                        })
                    )
                }
                </Row>
                </div>
                </Container>
                <div className="transparent-box">
                <h5>Các nhân vật bạn đã theo dõi</h5>
                <Container
                    fluid
                    style={{
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        padding: '20px',
                        display: 'flex',
                        gap: '15px',
                    }}
                >
                {followedUsers.length > 0 ? (
                followedUsers.map((user, index) => (
                    <div
                        key={index}
                        style={{
                            width: '150px',
                            minHeight: '200px',
                            backgroundColor: `hsl(${index * 30}, 70%, 85%)`,
                            borderRadius: '10px',
                            padding: '15px',
                            textAlign: 'center',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            display: 'inline-block',
                        }}
                    >
                        <Image
                            src={user?.userPFP ? PFP(user.userPFP) : '/image/defaultpfp.jpg'}
                            alt="Avatar"
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: '10px',
                            }}
                        />
                        <h5 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '5px' }}>
                            {user.userNickname || user.username}
                        </h5>
                    </div>
                ))
            ) : (
                <div
                    style={{
                        textAlign: 'center',
                        width: '100%',
                        color: '#888',
                        fontSize: '1.2rem',
                        padding: '20px',
                    }}
                >
                    Bạn chưa theo dõi người dùng nào.
                </div>
            )}
        </Container>
        </div>
            </Col>

        </Row>

        </>
    );
}