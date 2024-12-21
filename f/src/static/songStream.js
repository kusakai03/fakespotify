import axios from "axios";
import React from "react";
import { GetLocalBE } from "./getstring";

export function streamSong(songID){
    axios.post(GetLocalBE('/stream/' + songID))
}