import React, { PropTypes, Component } from 'react';

import * as themeData from './theme-data';

type ContextType = { [key: string]: any };

type Props = {
  context?: ContextType,
};

type State = {
  context: ContextType,
};

class ThemeProvider extends Component {
  static childContextTypes = {
    renderLineItemImage: PropTypes.func.isRequired,
  };
  props: Props;
  state: State = {
    context: this.calcContext(this.props),
  };

  calcContext(props) {
    return Object.assign({}, props.context || {}, themeData);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.context != this.props.context) {
      this.setState({
        context: this.calcContext(nextProps),
      });
    }
  }

  getChildContext() {
    return this.state.context;
  }

  render() {
    return this.props.children;
  }
}

export default ThemeProvider;
