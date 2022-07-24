import './App.css';
import { useState } from "react";
import { AEditor } from "./AEditor";

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

import { useEsbuild } from "./wasm/useEsbuild";
import { Sandbox } from "./components/Sandbox";
import { AddFileModal } from "./components/AddFileModal";
import Nav from 'react-bootstrap/esm/Nav';

const radios = [
    { name: "JS", value: "JS" },
    { name: "HTML", value: "HTML" },
    { name: "CSS", value: "CSS" },
];

const FILEMAP = new Map<string, string[]>([
    ["JS", ["index.tsx", "sum.tsx"]],
    ["HTML", ["index.html"]],
    ["CSS", ["index.css"]],
]);

const FILES = new Map<string, string>([
    ["index.tsx",
        `import { sum } from './sum'
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
    <h1>Hello, world!{sum(1,1)}</h1>,
    document.getElementById('root')
);`],
    ["sum.tsx", "export const sum = (a: number, b: number) => a + b"],
    ["index.html", `<div id = "root">this is div tag</div>`],
    ["index.css",
        `#root {
    color: red;
}`],
]);

const isJSFILE = /(?:js|jsx|ts|tsx)$/;

function App() {
    const [currFile, setcurrFile] = useState("index.tsx");
    const [filesContext, setFilesContext] = useState(FILES);
    const [fileMap, setFilemap] = useState(FILEMAP);
    const [radioValue, setRadioValue] = useState("JS");
    const [output, setOutput] = useState("//waite for build");
    const [htmlDoc, setHtmlDoc] = useState(
        "<html><body><h1>I'm iframe</h1></body></html>"
    );

    const myEsbuild = useEsbuild();
    const [show, setShow] = useState(false);
    const hide = () => {
        setShow(false);
    };

    const handleAddFile = (file: string) => {
        const newFile = `${file}.tsx`;
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
            const code = await myEsbuild(
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
                <Navbar style={{ height: "7vh" }} bg="warning" role={"navigation"}>
                    <Container fluid>
                        <Navbar.Brand>
                            ESbuild on web
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse role={"changeFileType"} className="justify-content-center">
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
                        </Navbar.Collapse>
                        <Button onClick={Click}>build</Button>
                    </Container>
                </Navbar>

                <Container fluid  >
                    <Row className="justify-content-md-center">
                        <Col
                            style={{ height: "86vh" }}
                            sm={4}
                        >
                            <Tabs
                                style={{ height: "5vh" }}
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
                            </Tabs >
                            <AEditor
                                code={filesContext.get(currFile)}
                                updateFile={updateFiles}
                            />
                        </Col>
                        <Col style={{ height: "93vh" }} sm={4}>
                            <AEditor code={output} />
                        </Col>
                        <Col style={{ height: "93vh" }} sm={4}>
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
