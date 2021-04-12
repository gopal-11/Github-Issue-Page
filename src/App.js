import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useState } from "react";
export default function App() {
  const [user, setUser] = useState("");
  const [repo, setRepo] = useState("");
  const [issues, setIssues] = useState([]);
  const handleSubmit = () => {
    getData();
  };

  const handleRepo = (e) => {
    setRepo(e.target.value);
    console.log(e.target.value);
  };

  const handleUser = (e) => {
    setUser(e.target.value);
    console.log(e.target.value);
  };

  const getData = () => {
    fetch(`https://api.github.com/repos/${user}/${repo}/issues`)
      //fetch('https://api.github.com/repos/octocat/hello-world/issues')
      .then((res) => res.json())
      .then((issues) => setIssues(issues));
    console.log(issues);
  };

  return (
    <div className="App">
      <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">Github Issue Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav"> */}
        {/* <Nav className="mr-auto">
      
    </Nav> */}
        {/* </Navbar.Collapse> */}
      </Navbar>

      <br />
      <div background-color="red">
        <h3 variant="primary">
          You can get all the open/close issues of a repo of a particular user
        </h3>
        <br />

        <Form inline>
          <FormControl
            type="text"
            placeholder="Github Username"
            className="mr-sm-2"
            onChange={handleUser}
          />
          <FormControl
            type="text"
            placeholder="Repository Name"
            className="mr-sm-2"
            onChange={handleRepo}
          />
          <Button variant="outline-success" onClick={handleSubmit}>
            Search
          </Button>
        </Form>
      </div>
      {issues.map((issue) => {
        return (
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h1>Issue By:- {issue.user.login} </h1>
              <span>id:- {issue.user.id}</span>
              <h4>
                <b>Title:- </b>
                {issue.title}
              </h4>
              <h4>Description</h4>
              <p>{issue.body}</p>
              <h6 style={{ color: "red" }}>{issue.state}</h6>
            </div>
          </div>
        );
      })}
    </div>
  );
}
