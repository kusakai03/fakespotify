import React from "react";
export function GetLocalBE(route){
    return "http://localhost:8000" + route;
}
export function GetGenres(){
    const genres = [
        "Pop", "Rock", "Jazz", "Classical", "Hip-Hop/Rap", "Country", "Blues", "Reggae", "R&B/Soul",
        "Electronic/Dance (EDM)", "Folk", "Punk", "Alternative", "Metal", "Indie", "Gospel", "Techno", 
        "Disco", "Trance", "House", "Ambient", "Funk", "Ska", "Swing", "Grunge", "Bluegrass", 
        "Latin (e.g., Salsa, Bachata, Tango)", "World Music", "Opera", "Soundtrack", "Dubstep", "Hardcore", 
        "K-pop", "Psychedelic Rock", "Post-punk", "Reggaeton", "Trap", "Acoustic", "New Age", "Experimental", 
        "Folk Rock", "Jazz Fusion", "Progressive Rock", "Industrial", "Savant Pop", "Lofi Hip-Hop", 
        "Tech House", "Chillwave", "Synthwave", "Vaporwave", "Tango", "Bollywood", "Celtic", "Afrobeat", 
        "Soul", "Blues Rock", "Trap Soul", "Kawaii Metal", "Bossa Nova", "Zydeco", "Electropop", "Neofolk", 
        "Salsa", "Bhangra", "Tropical House", "Future Bass", "Big Room", "Post-rock", "Screamo", "Hardstyle", 
        "Industrial Metal", "Melodic Death Metal", "Deathcore", "Grindcore", "Post-hardcore", "Nu Metal", 
        "Viking Metal", "Black Metal", "Ambient Dub", "Downtempo", "Tech Trance", "Minimal Techno", 
        "Lounge", "Chiptune", "J-Pop", "Cumbia", "Sambass", "Haitian Kompa", "Mambo", "Marching Band", 
        "Fado", "Reggae Fusion", "Folk Punk", "Art Rock", "Christian Rock", "Dub", "Ethereal Wave", 
        "Ragga", "Minimal Wave", "Gothic Rock", "Doom Metal", "Shoegaze", "Chamber Pop", "Grime", "Baroque Pop",
        "Ballad", "Soul Jazz", "Vocal Jazz", "Neo-Soul", "Indie Pop", "Alternative Hip-Hop", "Post-Disco", 
        "Psytrance", "Lo-Fi", "Electro Swing", "Reggae Dub", "Soul Funk", "Barbershop", "New Wave", "Ska Punk",
        "Crunk", "Chamber Music", "Psychobilly", "Doo-Wop", "Surf Rock", "Celtic Punk", "Synthpop"
    ];
    return genres;
}
export function PFP(path){
    return GetLocalBE("/pfps/") + path;
}
export function SONG(path){
    return GetLocalBE("/images/") + path;
}
export function AUDIO(path){
    return GetLocalBE("/musics/") + path;
}