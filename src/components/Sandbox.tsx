import React = require("react");

export const Sandbox = (props) => {
  const {htmlDoc} = props;
  

  return (
    <div>
      <iframe id="myiframe" srcDoc={htmlDoc} />
    </div>
  );
};
