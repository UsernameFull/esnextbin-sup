import React = require("react");
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
  MDBDropdownLink,
  MDBIcon,
} from "mdb-react-ui-kit";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
//import '@fortawesome/fontawesome-free/css/all.min.css';

export const Mdb = () => {
  const [basicActive, setBasicActive] = React.useState("tab1");

  const handleBasicClick = (value: string) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Tab 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Tab 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            <MDBDropdown group className="shadow-0">
              <MDBDropdownToggle size='sm' color="link">
                <MDBIcon fas icon="plus" />
              </MDBDropdownToggle>
              <MDBDropdownMenu size='sm'>
                <MDBDropdownItem>
                  <MDBDropdownLink href="#">.ts</MDBDropdownLink>
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <MDBDropdownLink href="#">.tsx</MDBDropdownLink>
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
    </>
  );
};
