import React, {useState} from "react";

import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {Howl} from "howler";




export default function Search() {


    const audioClips = [
        {sound: "https://www.dropbox.com/s/4vs4d2jn8p8iho3/iamafurry.mp3?raw=1", label: "i'm a furry"},
        {  sound: "https://www.dropbox.com/s/tbeayhu2dv142pa/mrglmr.mp3?raw=1", label: "mrglmrglglg"},
        {  sound: "https://www.dropbox.com/s/mmqv4942e0ust9x/dicktwist.mp3?raw=1", label: "dick twist"},
        {  sound: "https://www.dropbox.com/s/g7bi052pn15k8bd/supranal.mp3?raw=1", label: "super anal"}
    ]

    // considering the data object to search on name
    const [searchedData, setSearchedData] = useState([]);


    const handleSearch = event => {
        const data = audioClips.filter(
            user => user.label.indexOf(event.target.value) !== -1
        );
        setSearchedData(data);
    };
    const subTaskComponents = audioClips.map(user =>
        <Button className="buttonpad" size="lg" key={user.label} onClick={() => soundPlay(user.sound)}>
            {user.label}
        </Button>
    )

    const soundPlay = (src) => {
        const sound = new Howl ({
            src,
            html5: true

        })
        sound.play();
    }
    const showSearchedData = () => {

        return searchedData.length == 0 ?  subTaskComponents : searchedData.map(user => (
            <Button className="buttonpad" size="lg" key={user.label} onClick={() => soundPlay(user.sound)}>
                {user.label}
            </Button>


        ));
    };

    return (
        <>
            <Col xs={12}>
                <input type="text"  placeholder="Search" onChange={handleSearch} />
            </Col>
            <h2 className="hi">
            </h2>
            <Col md={12}>
                {showSearchedData()}
            </Col>
        </>



    );
}
