
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';
import { default as RDropzone } from 'react-dropzone';
import cx from 'classnames';

import {
  blueIdentity,
} from '../../shared/colors';


class Dropzone extends PureComponent {
  render() {
    const {
      style,
      ...others
    } = this.props;

    return (
      <RDropzone
        style={{
          ...s.zone,
          ...style
        }}
        activeStyle={s.zoneActive}
        {...others}
      >
        {this.renderContent}
      </RDropzone>
    );
  }

  renderContent = ({ isDragActive, isDragReject }) => {
    if (isDragActive) {
      return (
        <p style={s.dropText}>
          <span style={{ ...s.dropTextPrimary, ...s.dropTextActive }}>
            Tu peux lâcher ! :D (à ne pas reproduire sur une 6c)
          </span>
        </p>
      );
    }

    if (isDragReject) {
      return (
        <p style={s.dropText}>
          <span style={{ ...s.dropTextPrimary, ...s.dropTextReject }}>
            Le type de fichier n'est pas bon :(
          </span>
        </p>
      );
    }

    return (
      <p style={s.dropText}>
        <span style={s.dropTextPrimary}>Fais glisser-déposer des fichiers ici !</span><br />
        <span style={s.dropTextSecondary}>Ou cliques pour en sélectionner sur le PCey.</span>
      </p>
    );
  }
}

const s = {
  zone: {
    borderRadius: 3,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#999',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoneActive: {
    borderColor: blueIdentity,
  },

  dropText: {
    textAlign: 'center',
  },
  dropTextPrimary: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  dropTextSecondary: {},

  dropTextActive: {
    fontWeight: 'normal',
    color: blueIdentity,
  },
};

export default Dropzone;
