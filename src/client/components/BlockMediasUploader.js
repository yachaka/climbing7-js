
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';
import noop from 'no-op';

import fetch from '../lib/throwFetch';
import uploadFiles from '../lib/uploadFiles';

class BlockMediasUploader extends PureComponent {
  static propTypes = {
    onUploaded: T.func.isRequired,
    blockId: T.number.isRequired,
    mediaKey: T.string.isRequired,
  };

  static defaultProps = {
    onUploaded: noop,
  };

  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      error: null,
    };
  }

  uploadFiles = () => {
    const files = [...this.input.files];
    const data = new FormData();

    files.forEach(file => {
      data.append(this.props.mediaKey, file);
    });

    this.setState({ uploading: true });
    return fetch(`/blocks/${this.props.blockId}/medias`, {
      method: 'POST',
      body: data,
    })
      .then(res => res.json())
      .then(this.props.onUploaded)
      .catch(err => this.setState({ error: err.statusText }))
      .then(() => this.setState({ uploading: false }));

  }



  render() {
    const {
      style,
      onUploaded,
      blockId,
      mediaKey,
      ...others
    } = this.props;

    const {
      uploading,
      error,
    } = this.state;


    return (
      <div style={style} {...others}>
        <input ref={el => this.input = el} type="file" />
        <button onClick={this.uploadFiles}>Upload</button>
      </div>
    );
  }
}

export default BlockMediasUploader;
