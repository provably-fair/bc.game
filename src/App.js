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
      hashDice: false,
      validated: false
    }
  }

  handleSubmit = (event) => {

    const { ServerSeed, ClientSeed, Nonce, classicDice, hashDice } = this.state;

    const form = event.currentTarget;
    if (form.checkValidity() === false || ServerSeed === '' || ClientSeed === '') {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validated: true })
    }
    else
      this.setState({
        result: classicDice ? roll(`${ServerSeed}:${ClientSeed}:${Nonce}`) : hashDice ? getRoll(`${ServerSeed}${ClientSeed}${Nonce}`) : 0,
        showResult: true,
        validated: true
      })
  }

  render() {
    const { ServerSeed, ClientSeed, Nonce, result, showResult, classicDice, hashDice, validated } = this.state;
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
            this.setState({
              classicDice: true, hashDice: false, showResult: false, ServerSeed: '',
              ClientSeed: '', Nonce: 0, validated: false
            })
          }} >
            Classic Dice
            </Button>
          <Button variant={hashDice ? 'primary' : 'light'} className="ml-2" onClick={() => {
            this.setState({
              hashDice: true, classicDice: false, showResult: false, ServerSeed: '',
              ClientSeed: '', Nonce: 0, validated: false
            })
          }} >
            Hash Dice
            </Button>
        </Row>
        <Form className="mt-5 col-md-5" noValidate validated={validated} >
          <Form.Group controlId="formBasicServerSeed">
            <Form.Label>Server Seed</Form.Label>
            <Form.Control type="text" required placeholder="Enter Server Seed" value={ServerSeed} onChange={(e) => {
              this.setState({ ServerSeed: e.target.value })
            }} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Server Seed.
          </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicClientSeed">
            <Form.Label>Client Seed</Form.Label>
            <Form.Control type="text" required placeholder="Enter Client Seed" value={ClientSeed} onChange={(e) => {
              this.setState({ ClientSeed: e.target.value })
            }} />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Client Seed.
          </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicNonce">
            <Form.Label>Nonce</Form.Label>
            <Form.Control type="number" required placeholder="Nonce" value={Nonce} onChange={(e) => {
              this.setState({ Nonce: e.target.value })
            }} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={this.handleSubmit}>
            Submit
        </Button>
          {showResult && validated && <Alert className="mt-3" variant="success">
            The result is : {result} !
        </Alert>
          }
        </Form>

      </div >
    );
  }
}

export default App;
