
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';

class Button extends PureComponent {
  
  render() {
    const {
      style,
      ...others
    } = this.props;

    return (
      <button style={{ ...s.button, ...style }} {...others} />
    );
  }
}

const s = {
  button: {

  },
};

export default Button;
