
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';
import deepEqual from 'deep-equal';

import TextBlock from './TextBlock';
import Button from './Button';

export const blockShape = T.shape({
  id: T.number.isRequired,
  key: T.string.isRequired,
  type: T.string.isRequired,
  data: T.object,
});

class Block extends PureComponent {
  static propTypes = {
    BlockComponent: T.func.isRequired,
    block: blockShape,
  };

  constructor(props) {
    super(props);

    this.state = {
      syncing: false,
      editMode: false,
      block: this.props.block,
    };
  }

  syncToServer = () => {
    if (this.hasChanged()) {
      this.setState({ syncing: true });

      fetch(`/blocks/${this.props.block.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state.block),
      })
        .then(res => {
          this.setState({ syncing: false });

          if (res.status !== 200) {
            alert('Oups ! Impossible de sauvegarder ce block.');
          }
        });
    }
  }

  hasChanged = () => !deepEqual(this.props.data, this.state.data)
  changeData = (newData) => {
    this.setState({
      block: {
        ...this.state.block,
        data: {
          ...this.state.block.data,
          ...newData,
        },
      },
    });
  }

  // setEditMode = (bool) => {
  //   this.setState({ editMode: bool });
  // }

  editButtonClick = () => {
    if (this.state.editMode) {
      this.setState({ editMode: false });
      this.syncToServer();
    } else {
      this.setState({ editMode: true });
    }
  }

  render() {
    const {
      style,
      BlockComponent,
      block: blockProp,

      ...others
    } = this.props;

    const {
      editMode,
      block,
    } = this.state;

    return (
      <div style={{ ...s.block, ...style }} {...others}>
        {this.renderEditButton()}

        <BlockComponent
          ref="block"
          editMode={editMode}
          data={block.data}
          changeData={this.changeData}
        />
      </div>
    );
  }

  renderEditButton = () => {
    return (
      <Button style={s.editIcon} onClick={this.editButtonClick}>
        { !this.state.editMode
          ? <i className="fa fa-pencil"></i>
          : <i className="fa fa-check-circle"></i> }
      </Button>
    );
  }
}

const s = {
  block: {
    position: 'relative',
  },
  editIcon: {
    position: 'absolute',
    right: 6,
    top: 6,
  },
};

export default Block;
