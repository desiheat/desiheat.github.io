
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Search from "./search.js";
import App2 from "./App2.js";



function App() {
        return (
            <Container className="mainpagecontainer">

<App2/>
                <Row>
                    <Search/>
                </Row>
            </Container>

        );
}

export default App;
