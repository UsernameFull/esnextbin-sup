import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import { Button, Tabs } from 'antd';
import React = require("react");
const { TabPane } = Tabs;

const initialPanes = [
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  {
    title: 'Tab 3',
    content: 'Content of Tab 3',
    key: '3',
    closable: false,
  },
];

export const Antdui = () => {
  const [activeKey, setActiveKey] = React.useState(initialPanes[0].key);
  const [panes, setPanes] = React.useState(initialPanes);
  const newTabIndex = React.useRef(0);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...panes];
    newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: newActiveKey });
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  const tabClick = (e)=>{
    console.log(e)
  }

  return (
    <Tabs type="editable-card" onChange={onChange} onDoubleClick ={(e)=>tabClick(e)} activeKey={activeKey} onEdit={onEdit}>
      {panes.map(pane => (
        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
          {pane.content}
        </TabPane>
      ))}
    </Tabs>
  );
};
