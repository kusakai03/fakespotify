import React from "react";
export function GetLocalBE(route){
    return "http://localhost:8000" + route;
}
export function GetGenres(){
    const genres = [
        "Acoustic", "Afrobeat", "Alternative", "Alternative Hip-Hop", "Ambient", "Ambient Dub", "Ballad", 
        "Barbershop", "Baroque", "Baroque Pop", "Big Room", "Blues", "Blues Rock", "Bollywood", "Bossa Nova", 
        "Chamber Music", "Chamber Pop", "Chillwave", "Chiptune", "Christian Rock", "Classical", "Crunk", "Cumbia", 
        "Cumbia Villera", "Deathcore", "Dance Pop", "Dancehall", "Disco", "Doo-Wop", "Downtempo", "Dub", "Dubstep", 
        "Electro Swing", "Electroclash", "Electropop", "Electronic/Dance (EDM)", "Ethereal Wave", "Experimental", 
        "Fado", "Folk", "Folk Punk", "Folk Rock", "Future Bass", "Goregrind", "Gospel", "Grime", "Grindcore", 
        "Gothic Rock", "Grunge", "Hardcore", "Hardcore Punk", "Hardstyle", "Hip-Hop/Rap", "House", "Industrial", 
        "Industrial Metal", "Indie", "Indie Pop", "Jazz", "Jazz Fusion", "Jazz Rock", "J-Pop", "K-pop", "Kawaii Metal", 
        "Klezmer", "Latin (e.g., Salsa, Bachata, Tango)", "Lo-Fi", "Lofi Hip-Hop", "Lounge", "Marching Band", 
        "Melodic Death Metal", "Melodic Hardcore", "Minimal Techno", "Minimal Wave", "Mambo", "Metal", "Neofolk", 
        "New Age", "New Wave", "Nu Metal", "Pop", "Post-Disco", "Post-hardcore", "Post-punk", "Post-punk Revival", 
        "Post-rock", "Psychedelic Rock", "Psytrance", "Progressive Rock", "Punk Rock", "Ranchera", "Reggae", 
        "Reggae Dub", "Reggae Fusion", "Reggaeton", "Rock", "R&B/Soul", "Ragga", "Savant Pop", "Screamo", "Soul", 
        "Soul Funk", "Ska", "Ska Jazz", "Ska Punk", "Soundtrack", "Surf Rock", "Synthpop", "Synthwave", "Tech House", 
        "Tech Trance", "Tango", "Tango Nuevo", "Trap", "Trap Beats", "Trap Soul", "Tropical House", "Vaporwave", 
        "Viking Metal", "Vocal Jazz", "Vocal House", "Vocaloid", "World Music", "Zydeco"
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