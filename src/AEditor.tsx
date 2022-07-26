import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";


export const AEditor = (props) =>{
    let {code,updateFile} = props;

    const onChange = (newValue) => {
        updateFile(newValue)
    }
    return(
        <AceEditor
        mode="typescript"
        theme="tomorrow"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        value={code}
        fontSize={16}
        height="100%"
        showPrintMargin={false}
        enableLiveAutocompletion={true}
        editorProps={{
            maxLines: Infinity,
            $blockScrolling: true,
        }}
        placeholder = "// insert code here"
        setOptions={{
            fontFamily: "Fira Code, Fira Mono, monospace, Consolas",
        }}
        />
    )
}