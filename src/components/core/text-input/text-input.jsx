/* @flow */

import React, { Element, Component, PropTypes } from 'react';
import _ from 'lodash';
import { autobind } from 'core-decorators';
import classNames from 'classnames';

import s from './text-input.css';

type Props = {
  className?: string,
  labelClass?: string,
  errorClass?: string,
  /*
   @pos prop - indicates the position of the input element, and can be:
   t or top
   l or left
   b or bottom
   r or right
   bottom-right
   middle-v - combination of t and b
   middle-h - combination of l and r
   or any combination of t, l, b, and r
   */
  pos?: string,
  error?: boolean | string,
  type?: string,
  placeholder?: string,
  label?: ?string | Element<*>,
  // modificators
  hasCard?: boolean,
  hasSymbol?: boolean,
  children?: any,
};

type State = {
  isFocused: boolean,
};

class TextInput extends Component {
  props: Props;
  state: State = {
    isFocused: false,
  };

  static contextTypes = {
    error: PropTypes.string,
  };

  get contextError(): ?string {
    return this.context.error;
  }

  calcPositions(position: ?string): Array<string> {
    if (!position) return [];

    switch (position) {
      case 'middle-v':
        return ['t', 'b'];
      case 'middle-h':
        return ['r', 'l'];
      case 'bottom-right':
        return ['b', 'r'];
      case 'top':
        return ['t'];
      case 'bottom':
        return ['b'];
      case 'right':
        return ['r'];
      case 'left':
        return ['l'];
      default:
        return position.split('');
    }
  }

  get label() {
    const { props } = this;
    if (props.label) {
      if (typeof props.label === 'string') {
        return <span className={classNames(props.labelClass, s.labelText)}>{props.label}</span>;
      }
      return <span className={classNames(props.labelClass, s.labelElement)}>{props.label}</span>;
    }
  }

  @autobind
  changeFocus(to: boolean) {
    this.setState({ isFocused: to });
  }

  render() {
    const { props } = this;

    const positions = this.calcPositions(props.pos);
    const posClassNames = positions.map(side => s[`pos-${side}`]);

    const { className, labelClass, errorClass, type = 'text', hasCard, hasSymbol, pos, children, ...rest } = props;

    const error = props.error || this.contextError;

    const showSmallPlaceholder = !!props.value && props.placeholder;
    const showErrorText = error && typeof error === 'string';

    const inputClass = classNames(s.textInput, className, posClassNames, {
      [s.error]: !!error,
      [s.empty]: !error && (!props.value || _.isEmpty(props.value)),
    });

    const blockClass = classNames(s.block, posClassNames, {
      [s.error]: error,
      [s.hasCard]: hasCard,
      [s.hasSymbol]: hasSymbol,
      [s.hasTopMessages]: showSmallPlaceholder || showErrorText,
      [s.focused]: this.state.isFocused,
    });

    let childrenWithProps;

    if (children) {
      childrenWithProps = React.Children.map(children, child => {
        return React.cloneElement(child, {
          className: inputClass,
          onFocus: () => this.changeFocus(true),
          onBlur: () => this.changeFocus(false),
          type,
          ...rest,
        });
      });
    }

    const content =
      childrenWithProps ||
      <input
        onFocus={() => this.changeFocus(true)}
        onBlur={() => this.changeFocus(false)}
        className={inputClass}
        type={type}
        {...rest}
      />;

    const errorClassName = classNames(s.errorMessage, errorClass);

    return (
      <div className={blockClass}>
        {showSmallPlaceholder && <span className={s.placeholder}>{props.placeholder}</span>}
        {showErrorText && <span className={errorClassName}>{error}</span>}
        {content}
        {this.label}
      </div>
    );
  }
}

export default TextInput;
