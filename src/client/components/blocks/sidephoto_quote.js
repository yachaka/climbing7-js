
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';

import Block from '../Block';
import BlockMediasUploader from '../BlockMediasUploader';
import SplitPane from 'react-split-pane';
import PanelGroup from 'react-panelgroup';
import ContentEditable from 'react-contenteditable';
import DropZone from 'react-dropzone';
import { ResizableBox } from 'react-resizable';

class Sidephoto_quote extends Block {

  static propTypes = {
    block: T.shape({
      id: T.number.isRequired,
      data: T.shape({
        text: T.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  onTextChange = (e) => {
    this.setDataKey('text', e.target.value);
    this.debouncedSave();
  }
  setPercentSplit = (size) => {
    this.setDataKey('percentSplit', size / this.div.offsetWidth * 100);
    this.debouncedSave();
  }
  uploadPhoto = (files) => {
    this.uploadMedias({
      photo: files[0],
    });
  }

  render() {
    const {
      editMode,
      saving,
      error,

      block,
    } = this.state;

    const {
      id,
      medias,
      data,
    } = block;

    const {
      text,
      percentSplit,
    } = data;

    const photo = medias.find(m => m.key === 'photo');

    return (
      <div
        ref={el => this.div = el}
        className="block sidephoto_quote"
      >
        <p>
          {saving && 'Saving...'}
          {error}
          {editMode
            ? <a onClick={this.normalMode}>Go normal</a>
            : <a onClick={this.editMode}>Go edit</a> }
        </p>

        <SplitPane
          split="vertical"
          size={percentSplit + '%'}
          onDragFinished={this.setPercentSplit}
        >
          <div
            className="photo-div"
            style={{
              backgroundImage: 'url('+ (photo && photo.url) + ')',
            }}
          >
            <DropZone
              className="change-photo"
              multiple={false}
              onDrop={this.uploadPhoto}
            >
              Changer la photo
            </DropZone>
          </div>

          <ContentEditable
            className="text-div"
            html={text}
            onChange={this.onTextChange}
          />

        </SplitPane>

      </div>
    );
  }

}

const s = {
  
};

export default Sidephoto_quote;
