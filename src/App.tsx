//import './App.css';
import React = require("react");
import { version } from "./wasm/useEsbuild";
import { AEditor } from "./AEditor";
import PubSub = require("pubsub-js");

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Tabs from "react-bootstrap/esm/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/esm/Row";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Modal from "react-bootstrap/Modal";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { mybuild } from "./wasm/useEsbuild";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Sandbox } from "./components/Sandbox";
import { AddFileModal } from "./components/AddFileModal";

const radios = [
  { name: "JS", value: "JS" },
  { name: "HTML", value: "HTML" },
  { name: "CSS", value: "CSS" },
];

const FILEMAP = new Map<string, string[]>([
  ["JS", ["index.ts", "sum.ts"]],
  ["HTML", ["index.html"]],
  ["CSS", ["index.css"]],
]);

const FILES = new Map<string, string>([
  ["index.ts", "import { sum } from './sum'\n\nexport default sum(1,2)"],
  ["sum.ts", "export const sum = (a: number, b: number) => a + b"],
  ["index.html", "<p>it is a p tag</p>"],
  ["index.css", ""],
]);

const isJSFILE = /(?:js|jsx|ts|tsx)$/;

function App() {
  const [currFile, setcurrFile] = React.useState("index.ts");
  const [filesContext, setFilesContext] = React.useState(FILES);
  const [fileMap, setFilemap] = React.useState(FILEMAP);
  const [radioValue, setRadioValue] = React.useState("JS");
  const [output, setOutput] = React.useState("//waite for build");
  const [htmlDoc, setHtmlDoc] = React.useState(
    "<html><body><h1>I'm iframe</h1></body></html>"
  );

  const [show, setShow] = React.useState(false);
  const hide = () => {
    setShow(false);
  };

  const handleAddFile = (file: string) => {
    const newFile = `${file}.ts`;
    const newFiles = new Map(filesContext);
    newFiles.set(newFile, "");
    setFilesContext(newFiles);

    const newFileMap = new Map(fileMap);
    newFileMap.set("JS", [...fileMap.get("JS"), newFile]);
    setFilemap(newFileMap);
  };

  const Click = () => {
    console.log("Click");
    (async () => {
      const code = await mybuild(
        new Map([...filesContext].filter(([k, v]) => isJSFILE.test(k)))
      );
      setOutput(code);

      let htmlTag = 
      `<html>
        <body>
          ${filesContext.get("index.html")}
        </body>
        <style>
          ${filesContext.get("index.css")}
        </style>
        <script>${code}</script>
      </html>`;
      setHtmlDoc(htmlTag);
    })();
  };

  const updateFiles = (newValue: string) => {
    const newFiles = new Map<string, string>([...filesContext]);
    newFiles.set(currFile, newValue);
    setFilesContext(newFiles);
  };

  return (
    <>
      <Container fluid>
        <Navbar bg="warning">
          <Container>
            <Navbar.Brand>
              React {version}
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={"outline-dark"}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => {
                      setRadioValue(e.currentTarget.value);
                      setcurrFile(fileMap.get(e.currentTarget.value)[0]);
                    }}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
              <Button onClick={Click}>build</Button>
            </Navbar.Brand>
          </Container>
        </Navbar>

        <Container fluid>
          <Row className="justify-content-md-center">
            <Col
              style={{
                fontFamily: "Fira Code, Fira Mono, monospace, Consolas",
              }}
              sm={4}
            >
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                activeKey={currFile}
                onSelect={(k) => {
                  if (fileMap.get(radioValue).includes(k)) {
                    setcurrFile(k);
                  }
                  if (k == "add file") {
                    setShow(true);
                  }
                }}
              >
                {fileMap.get(radioValue).map((file, idx) => (
                  <Tab key={idx} eventKey={file} title={file}></Tab>
                ))}
                {radioValue == "JS" ? (
                  <Tab key="add file" eventKey="add file" title="+"></Tab>
                ) : null}
              </Tabs>
              <AEditor
                code={filesContext.get(currFile)}
                updateFile={updateFiles}
              />
            </Col>
            <Col sm={4}>
              <AEditor code={output} />
            </Col>
            <Col sm={4}>
              <Sandbox htmlDoc={htmlDoc} />
            </Col>
          </Row>
        </Container>
        <AddFileModal show={show} onHide={hide} onSubmit={handleAddFile} />
      </Container>
    </>
  );
}

export default App;
