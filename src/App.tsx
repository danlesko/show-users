import React, {useState, useEffect} from 'react';
import './App.css';
import {Form, Button, Table} from 'react-bootstrap'
import userData from './users.json'

function App() {
  const [numUsers, setNumUsers] = useState(0)
  const [readyToDisplay, setReadyToDisplay] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
    let users = formDataObj["numUsers"]
    if (typeof users === "string") {

      setNumUsers(parseInt(users))
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    // userData.length = numUsers
    console.log(userData)
    if (numUsers > 0){
      //userData.length = numUsers
      setReadyToDisplay(true)
    }
  }, [numUsers])

  // @ts-ignore
  return (
    <div className="App container">
      <h1>Get Users App</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>How many users?</Form.Label>
          <br/>
          <Form.Control type="text" name="numUsers" placeholder="Enter users" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <br/>
      <br/>

      {numUsers > 0 && readyToDisplay && (<div className={"container"}>
        <Table striped bordered hover id="user_table">
        <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Location</th>
          <th>InUse</th>
        </tr>
        </thead>
        <tbody>
        {numUsers > 0 && userData.slice(0,numUsers).map((item, index) => {
          return (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.role}</td>
                <td>{item.location}</td>
                <td>{item.inUse ? "true": "false"}</td>
              </tr>
          )
        })}
        </tbody>
      </Table>
        </div>)}

    </div>
  );
}

export default App;
