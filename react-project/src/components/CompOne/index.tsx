import React from 'react';
import './index.scss';
import { add } from 'Utils/math';

interface IProperties {
    a: number
    b: number
}

function ComputedOne(props: IProperties) {
  const { a, b } = props;
  const sum = add(a, b);

  return <p className="computed-one">{`Hi, I'm computed one, my sum is ${sum}.`}</p>;
}

export default ComputedOne;
