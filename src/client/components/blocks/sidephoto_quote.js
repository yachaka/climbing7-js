
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
        percentSplit: T.number.isRequired,
      }).isRequired,
    }).isRequired,
  };

  setPercentSplit = (size) => {
    this.setDataKey('percentSplit', size / this.div.offsetWidth * 100);
    this.debouncedSave();
  }
  togglePhotoPosition = () => {
    this.setDataKey('photoOnRight', !this.state.block.data.photoOnRight);
    this.debouncedSave();
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
      percentSplit,
      photoOnRight,
    } = data;

    const panes = photoOnRight
      ? [this.renderTextPane(), this.renderPhotoPane()]
      : [this.renderPhotoPane(), this.renderTextPane()];

    return (
      <div
        ref={el => this.div = el}
        className="block sidephoto_quote"
      >
        <p>
          {saving && 'Saving...'}
          {error}
          <a onClick={this.togglePhotoPosition}>Toggle photo position</a>
        </p>

        <SplitPane
          split="vertical"
          size={percentSplit + '%'}
          onDragFinished={this.setPercentSplit}
          style={{ position: undefined, height: undefined }}
        >
          {panes}
        </SplitPane>

      </div>
    );
  }

  uploadPhoto = (files) => {
    this.uploadMedias({
      photo: files[0],
    });
  }

  renderPhotoPane = () => {
    const {
      medias,
      data,
    } = this.state.block;

    const photo = medias.find(m => m.key === 'photo');

    return (
      <div key="photoPane" className="photo-div">
        <img className="photo" src={photo && photo.url}/>
        <DropZone
          className="change-photo"
          multiple={false}
          onDrop={this.uploadPhoto}
        >
          <i className="fa fa-camera"></i>
          Changer la photo
        </DropZone>
      </div>
    );
  }

  onTextChange = (e) => {
    this.setDataKey('text', e.target.value);
    this.debouncedSave();
  }
  
  renderTextPane = () => {
    return (
      <ContentEditable
        key="textPane"
        className="text-div"
        html={this.state.block.data.text}
        onChange={this.onTextChange}
      />
    );
  }

}

const s = {
  
};

export default Sidephoto_quote;
