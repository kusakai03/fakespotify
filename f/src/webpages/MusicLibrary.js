import React from "react";
import { Row, Col, Button, Card } from 'react-bootstrap';

export default function MusicLibrary(){
    const followedArtists = [
        { id: 1, name: 'Ngọc Lan', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Hương Tràm', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Minh Tú', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Duy Khánh', image: 'https://via.placeholder.com/150' }
      ];
    
      // Dữ liệu ngẫu nhiên cho playlist
      const playlists = [
        { id: 1, title: 'Nhạc Chill', description: 'Những bản nhạc thư giãn', image: 'https://via.placeholder.com/300x200' },
        { id: 2, title: 'Top Hits 2024', description: 'Những bài hát hot nhất năm nay', image: 'https://via.placeholder.com/300x200' },
        { id: 3, title: 'Nhạc Quê Hương', description: 'Các ca khúc dân ca trữ tình', image: 'https://via.placeholder.com/300x200' }
      ];
    
      // Dữ liệu ngẫu nhiên cho bài hát đã thích
      const likedSongs = [
        { id: 1, title: 'Đoá Hoa Vô Thường', image: 'https://via.placeholder.com/80', plays: 1200 },
        { id: 2, title: 'Hạ Về', image: 'https://via.placeholder.com/80', plays: 2300 },
        { id: 3, title: 'Lạc Mất', image: 'https://via.placeholder.com/80', plays: 5600 },
        { id: 4, title: 'Bản Tình Ca Mưa', image: 'https://via.placeholder.com/80', plays: 3800 }
      ];
    
      return (
        <div className="container">
          {/* Hàng cuộn ngang cho danh sách các nhân vật đã theo dõi */}
          <h4>Danh sách theo dõi</h4>
          <Row className="overflow-auto py-3">
            {followedArtists.map((artist) => (
              <Col key={artist.id} xs="auto" className="me-3">
                <div className="text-center">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="img-fluid rounded-circle"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <p>{artist.name}</p>
                </div>
              </Col>
            ))}
          </Row>
    
          {/* Box cho các playlist */}
          <h4>Playlist của tôi</h4>
          <Row className="g-4">
            {playlists.map((playlist) => (
              <Col key={playlist.id} md={4}>
                <Card>
                  <Card.Img variant="top" src={playlist.image} />
                  <Card.Body>
                    <Card.Title>{playlist.title}</Card.Title>
                    <Card.Text>{playlist.description}</Card.Text>
                    <Button variant="primary" className="w-100">Nghe ngay</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
    
          {/* Hàng dành cho các nhạc đã thích */}
          <h4>Bài hát đã thích</h4>
          <Row className="g-4">
            {likedSongs.map((song) => (
              <Col key={song.id} md={4}>
                <Card className="d-flex flex-row align-items-center">
                  <div className="song-image me-3">
                    <img
                      src={song.image}
                      alt={song.title}
                      className="img-fluid rounded"
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{song.title}</Card.Title>
                    <Card.Text className="text-muted">
                      <i className="bi bi-headphones"></i> {song.plays} lượt nghe
                    </Card.Text>
                    <Button variant="secondary" size="sm">Nghe nhạc</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      );
    };