import React from 'react';
import { Form, Media, Button, Alert, Row } from 'react-bootstrap';
import { roll } from './Games/dice.js';
import { getRoll } from './Games/hashdice.js';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      ServerSeed: '',
      ClientSeed: '',
      Nonce: 0,
      result: 0,
      showResult: false,
      classicDice: true,
      hashDice: false
    }
  }

  render() {
    const { ServerSeed, ClientSeed, Nonce, result, showResult, classicDice, hashDice } = this.state;
    return (
      <div className="container pt-5">
        <Media>
          <img
            width={128}
            height={128}
            className="mr-3"
            src="logo192.png"
            alt="Generic placeholder"
          />
          <Media.Body>
            <br /><br />
            <h5>Provably Fair Verify Tool (BC.GAME)</h5>
          </Media.Body>
        </Media>
        <Row className="mt-5 ml-3">
          <Button variant={classicDice ? 'primary' : 'light'} onClick={() => {
            this.setState({ classicDice: true, hashDice: false, showResult: false })
          }} >
            Classic Dice
            </Button>
          <Button variant={hashDice ? 'primary' : 'light'} className="ml-2" onClick={() => {
            this.setState({ hashDice: true, classicDice: false, showResult: false })
          }} >
            Hash Dice
            </Button>
        </Row>
        <Form className="mt-5 col-md-5">
          <Form.Group controlId="formBasicServerSeed">
            <Form.Label>Server Seed</Form.Label>
            <Form.Control type="ServerSeed" placeholder="Enter Server Seed" value={ServerSeed} onChange={(e) => {
              this.setState({ ServerSeed: e.target.value })
            }} />
            <Form.Text className="text-muted">
              We'll never share your Server Seed with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicClientSeed">
            <Form.Label>Client Seed</Form.Label>
            <Form.Control type="ClientSeed" placeholder="Enter Client Seed" value={ClientSeed} onChange={(e) => {
              this.setState({ ClientSeed: e.target.value })
            }} />
            <Form.Text className="text-muted">
              We'll never share your Client Seed with anyone else.
          </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicNonce">
            <Form.Label>Nonce</Form.Label>
            <Form.Control type="number" placeholder="Nonce" value={Nonce} onChange={(e) => {
              this.setState({ Nonce: e.target.value })
            }} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={() => {
            this.setState({ result: classicDice ? roll(`${ServerSeed}:${ClientSeed}:${Nonce}`) : hashDice ? getRoll(`${ServerSeed}${ClientSeed}${Nonce}`) : 0, showResult: true })
          }}>
            Submit
        </Button>
          {showResult && <Alert className="mt-3" variant="success">
            The result is : {result} !
        </Alert>
          }
        </Form>

      </div >
    );
  }
}

export default App;
