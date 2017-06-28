import React, { Element } from 'react';
import classnames from 'classnames';
import s from './term-value-line.css';

type PropsType = {
  children: Array<Element | string>,
  className?: string,
};

const TermValueLine = (props: PropsType) => {
  const { className, ...rest } = props;
  return (
    <div className={classnames(s.block, className)} {...rest}>
      <div className={s.term}>{props.children[0]}</div>
      <div className={s.value}>{props.children[1]}</div>
    </div>
  );
};

export default TermValueLine;
