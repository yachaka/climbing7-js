
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';
import fetch from '../lib/throwFetch';
import debounce from 'lodash.debounce';
import merge from 'lodash.merge';

class Block extends PureComponent {
  
  constructor(props) {
    super(props);

    this.state = {
      editMode: true,
      saving: false,
      error: null,

      block: this.props.block,
    };
  }

  save = () => {
    this.setState({ saving: true });
    fetch(`/blocks/${this.state.block.id}`, {
      method: 'PUT',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.block),
    })
      .then(res => res.json())
      .then(block => this.setState({
        block: {
          ...this.state.block,
          block,
        },
      }))
      .catch(err => this.setState({ error: err.statusText }))
      .then(() => this.setState({ saving: false }));
  }
  debouncedSave = debounce(this.save, 500);


  uploadMedias = (medias) => {
    const data = new FormData();

    for (var key in medias) {
      data.append(key, medias[key]);
    }

    return fetch(`/blocks/${this.state.block.id}/medias`, {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
    .then(res => res.json())
    .then(this.setMedias);
  }
  setMedias = (medias) => this.setState({
    block: {
      ...this.state.block,
      medias,
    },
  });

  mergeDataKey = (key, value) => this.setDataKey(key, merge(this.state.block.data[key], value));
  setDataKey = (key, value) => this.setState({
    block: {
      ...this.state.block,
      data: {
        ...this.state.block.data,
        [key]: value,
      },
    },
  });

  editMode = () => this.setState({ editMode: true });
  normalMode = () => this.setState({ editMode: false });

}

const s = {
  
};

export default Block;