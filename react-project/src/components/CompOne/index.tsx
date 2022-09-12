import React from 'react';
import './index.scss';
import { add } from 'Utils/math';
import style from './index.module.scss';

interface IProperties {
    a: number
    b: number
}

function ComputedOne(props: IProperties) {
  const { a, b } = props;
  const sum = add(a, b);

  return <p className={`component-one ${style['component-one-aa']}`}>{`Hi, I'm computed one, my sum is ${sum}.`}</p>;
}

export default ComputedOne;
