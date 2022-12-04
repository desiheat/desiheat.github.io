import React from 'react';
import Row from "react-bootstrap/Row";

let clinetId = process.env.REACT_APP_API_KEY;
let clinetSecret = process.env.REACT_APP_OATH;

function getTwitchAuthorization() {
    let url = `https://id.twitch.tv/oauth2/token?client_id=${clinetId}&client_secret=${clinetSecret}&grant_type=client_credentials`;

    return fetch(url, {
        method: "POST",
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
}


class StreamsIndex extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }

    async componentDidMount() {
        const endpoint = "https://api.twitch.tv/helix/streams?user_login=desiheat";

        let authorizationObject = await getTwitchAuthorization();
        let { access_token, token_type } = authorizationObject;

        //token_type first letter must be uppercase
        token_type =
            token_type.substring(0, 1).toUpperCase() +
            token_type.substring(1, token_type.length);

        let authorization = `${token_type} ${access_token}`;

        let headers = {
            authorization,
            "Client-Id": clinetId,
        };

        fetch(endpoint, {
            headers,
        })
            .then(response => response.json())

            .then((json) => this.setState({ data: json.data }))

    }

    render() {
        const streams = this.state.data;
        let islive;
        {streams.map(stream => (
            islive = stream.viewer_count
        ))}
        let blob = streams.length == 0 ?
                <>
                    <div className="blob-offline"></div> offline
                </>  :
                <>
                    <div className="blob-online"></div> online <div className="col-12"> <a href="https://twitch.tv/desiheat"> watch now</a> with {islive} viewers </div>
                </> ;

        return (
            <>
<Row className="justify-content-center align-items-center">

          desiheat is currently

    {blob}

            </Row>

    </>

        );
    }


}

export default StreamsIndex;