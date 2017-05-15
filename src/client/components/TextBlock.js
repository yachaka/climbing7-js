
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';
import AutosizeTextarea from 'react-textarea-autosize';

class TextBlock extends PureComponent {
  static propTypes = {
    editMode: T.bool,
    data: T.shape({
      content: T.string,
    }).isRequired,
    changeData: T.func.isRequired,
  };

  onContentChange = (e) => {
    this.props.changeData({
      content: e.target.value,
    });
  }

  render() {
    const {
      style,
      editMode,
      data,
      changeData,
      ...others
    } = this.props;

    let content;

    if (editMode) {
      content = (
        <AutosizeTextarea onChange={this.onContentChange} value={data.content} />
      );
    } else {
      content = <p style={s.block} dangerouslySetInnerHTML={{ __html: data.content }} />;
    }

    return content;
  }
}

const s = {
  block: {
    whiteSpace: 'pre',
  },
};

export default TextBlock;
