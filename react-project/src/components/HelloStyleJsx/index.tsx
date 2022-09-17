import React, { FC } from 'react';
import style from './index.module.scss';

type HelloStyleJsxProperties = Record<string, never>

const HelloStyleJsx: FC<HelloStyleJsxProperties> = function (props: HelloStyleJsxProperties) {
  return (
    <>
      <div className="HelloStyleJsx">

        <div className={style['module-class-test']}>module-class-test</div>
        <div className="style-jsx-test">style-jsx-test</div>
        <div className={`${style['module-class-test']} style-jsx-test`}>module-class-test and </div>
      </div>
      <style jsx>
        {`
        .HelloStyleJsx{
          >div{
            margin:3px 6px;
            border-radius: 3px;
            padding: 0 6px;
          }
        }
        .style-jsx-test
        {
          background-color: #8f8
        }
        `}
      </style>
    </>
  );
};

export default HelloStyleJsx;
