import React, { FC, useState, useRef } from 'react';
import { Modal, Tabs, Button, Input } from 'antd';
import StoreRpaList from './storeRpaList';
import MyRpaList from './myRpaList';
import style from './style.scss';
import cx from 'classnames';

import { MyRpaItem, StoreRpaItem } from './api';
import { SearchOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { throttle } from 'lodash';

interface Props {
  selected?: boolean;
  onSelect?: (item: MyRpaItem | StoreRpaItem) => void;
}

const RpaListDialog: FC<Props> = function (props) {
  const { selected, onSelect } = props;
  const [visible, setVisible] = useState(!selected);
  const searchRef = useRef(null);
  const [keyword, setKeyword] = useState('');
  const onSearch = useRef(
    throttle(function ({ e, keyword, setKeyword }) {
      const target = e?.target || searchRef.current.input; //e 的对象会更实时一点
      // console.log('keyword, target.value :>> ', keyword, target.value);
      if (keyword !== target.value) {
        setKeyword(target?.value || '');
      }
    }, 800)
  );
  function openDialog() {
    setVisible(true);
  }
  function onCancel() {
    setVisible(false);
  }
  // function onClear() {
  //   console.log('searchRef.current :>> ', searchRef.current);
  //   searchRef.current.input.value = '';
  //   onSearch.current();
  // }

  function onSelect_(item: MyRpaItem | StoreRpaItem) {
    setVisible(false);
    onSelect && onSelect(item);
  }
  return (
    <>
      <div className={cx([style.noSelectRpa, 'flex-layout justify-center'])}>
        <Button type="dashed" onClick={openDialog}>
          选择RPA应用
        </Button>
      </div>
      <Modal title="选择RPA应用" visible={visible} onCancel={onCancel} footer={null} width={800}>
        <div className={style.rpaListWrap}>
          <div className={style.searchWp}>
            <Input
              ref={searchRef}
              size="small"
              prefix={<SearchOutlined />}
              allowClear
              // onPressEnter={onSearch}
              // onBlur={onSearch}
              // suffix={keyword ? <CloseCircleOutlined className="cursor-pointer" onClick={onClear} /> : null}
              onChange={(e) => onSearch.current({ e, keyword, setKeyword })}
            ></Input>
          </div>
          <Tabs className={style.tabs} destroyInactiveTabPane={false} defaultActiveKey="my">
            <Tabs.TabPane tab="我获取的RPA应用" key="store">
              <StoreRpaList keyword={keyword} onSelect={onSelect_}></StoreRpaList>
            </Tabs.TabPane>
            <Tabs.TabPane tab="我设计的RPA应用" key="my">
              <MyRpaList keyword={keyword} onSelect={onSelect_}></MyRpaList>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Modal>
    </>
  );
};
export default RpaListDialog;
