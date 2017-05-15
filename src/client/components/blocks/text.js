
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';

import Block from '../Block';
import ContentEditable from 'react-contenteditable';

class Text extends Block {

  static propTypes = {
    block: T.shape({
      id: T.number.isRequired,
      data: T.shape({
        title: T.string.isRequired,
        text: T.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  onTitleChange = (e) => {
    this.setDataKey('title', e.target.value);
    this.debouncedSave();
  }
  onTextChange = (e) => {
    this.setDataKey('text', e.target.value);
    this.debouncedSave();
  }

  render() {
    const {
      block,
    } = this.state;

    const {
      title,
      text,
    } = block.data;

    return (
      <div className="block text">
        <ContentEditable
          className="title"
          html={title}
          onChange={this.onTitleChange}
        />
        <ContentEditable
          className="text"
          html={text}
          onChange={this.onTextChange}
        />
      </div>
    );
  }
}

export default Text;
