import axios from "axios";
import React, { useEffect, useState } from "react";
import { faList } from '@fortawesome/free-solid-svg-icons';
import { GetLocalBE } from "../static/getstring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ListGroup } from 'react-bootstrap';
import AddPlaylistModal from "./AddPlaylistModal";

export default function AddSongToPlaylist({ songID, acc, handleClose, show }) {
    const [playlists, setPlaylist] = useState([]);
    const [selectedPlaylist, selectPlaylist] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        updatePlaylist();
    }, [acc]);

    function updatePlaylist(){
        if (acc?.userID) {
            axios.get(GetLocalBE('/userplaylists/' + acc.userID))
                .then(res => setPlaylist(res.data.data))
                .catch(err => console.error(err));
        }
    }
    function handleSelect(index) {
        selectPlaylist(playlists[index]);
    }

    function confirmSelect() {
        if (!selectedPlaylist) return;
        const value = {
            songID: songID,
            playlistID: selectedPlaylist.playlistID,
        };
        axios.post(GetLocalBE('/addtoplaylist'), value)
            .then(() => handleClose())
            .catch(err => console.error(err));
    }

    return (
        <>
            <AddPlaylistModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                acc={acc}
                onUpdate={updatePlaylist}
            />
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <ListGroup>
                    <ListGroup.Item onClick={() => setShowModal(true)}>
                            <FontAwesomeIcon icon={faList} />&nbsp;Thêm danh sách phát mới
                        </ListGroup.Item>
                        {playlists.map((playlist, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                active={selectedPlaylist && selectedPlaylist.playlistID === playlist.playlistID}
                                onClick={() => handleSelect(index)}
                                style={{backgroundColor: selectedPlaylist?.playlistID === playlist.playlistID
                                    ? 'pink'
                                    : 'white'}}
                            >
                                <FontAwesomeIcon icon={faList} />&nbsp;{playlist.playlistName}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="none" className="button" onClick={handleClose}>Hủy</Button>
                    <Button 
                        variant="none" 
                        className="button" 
                        onClick={confirmSelect} 
                        disabled={!selectedPlaylist}
                    >
                        Thêm vào
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
