import React, { useEffect, useState } from "react";
import HomeProductCard from "./HomepageProductCard";
import axios from "axios";
import { GetLocalBE } from "../static/getstring";
import FooterMusicPlayer from "./FooterMusicPlayer";

export default function HpageMain(){
    const [song, setPlaying] = useState();
    const [allMusic, setAllMusic] = useState([]);
    const [playlist, setPlayList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() =>{
        axios.get(GetLocalBE('/allmusic'))
        .then(res =>{
            setAllMusic(res.data.data);
        }).catch(e => console.log(e));
    }, []);

    useEffect(() =>{
        playMusic(playlist[currentIndex]?.songID);
    },[currentIndex, playlist]);

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
        </div>
    )
}