/* @flow */

import React, { Element } from 'react';

import ActionLink from 'components/core/action-link/action-link';

import styles from './editable-block.css';

type EditableProps = {
  isEditing: boolean,
  collapsed?: boolean,
  editAllowed?: boolean,
  className?: string,
  content?: ?Element<*>,
  children?: Element<*>,
  editAction?: () => any,
  actionsContent?: Element<*> | Array<Element<*>>,
  title: string | Element<*>,
};

const EditableBlock = (props: EditableProps) => {
  const editLink = () => {
    if (!props.isEditing && !props.collapsed && props.editAllowed) {
      return <ActionLink action={props.editAction} title="Edit" styleName="action" />;
    }
  };

  const actions = props.actionsContent || editLink();
  const content = !props.collapsed ? props.content || props.children : null;

  return (
    <article styleName="editable-block" className={props.className}>
      <header styleName="header">
        <h3 styleName="title">{props.title}</h3>
        {actions}
      </header>
      {content}
    </article>
  );
};

EditableBlock.defaultProps = {
  isEditing: false,
  collapsed: false,
  editAllowed: true,
};

export default EditableBlock;
