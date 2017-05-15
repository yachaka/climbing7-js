
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';

import { typeToComponent } from '../lib/blockTypes';
import Block from './Block';
import fetch from '../lib/throwFetch';
import mergeAndConcat from '../../shared/lib/mergeAndConcat';
import {
  allTypes as allBlockTypes,
  typeToHuman as blockTypeToHuman,
  typeToDefaultData as blockTypeToDefaultData,
} from '../lib/blockTypes';

class Post extends PureComponent {
  static propTypes = {
    canEdit: T.bool,
    post: T.object.isRequired,
  };

  static defaultProps = {
    canEdit: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      addingBlock: false,
      editMode: false,

      post: this.props.post,
      addBlock: {},
    };
  }

  addBlock = () => {
    fetch('/blocks', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        post_id: this.state.post.id,
        data: blockTypeToDefaultData(this.state.addBlock.type),
        ...this.state.addBlock,
      }),
    })
    .then(res => res.json())
    .then(block => this.setState(mergeAndConcat(this.state, {
      post: {
        blocks: [block],
      },
    })))
    .then(() => this.setState({ addBlock: {} }));
  }

  setAddBlockKeyValue = (key, value) => this.setState({
    addBlock: {
      ...this.state.addBlock,
      [key]: value,
    },
  });
  setAddBlockKey = (e) => this.setAddBlockKeyValue('key', e.target.value);
  setAddBlockType = (e) => this.setAddBlockKeyValue('type', e.target.value);

  render() {
    const {
      post,
    } = this.state;

    return (
      <div>
        <input type="text" value={this.state.addBlock.key} onChange={this.setAddBlockKey} />
        <select value={this.state.addBlock.type} onChange={this.setAddBlockType}>
          <option value=""></option>
          { allBlockTypes.map(type => (
            <option value={type}>{blockTypeToHuman(type)}</option>
          ))}
        </select>
        <button onClick={this.addBlock}>Add block</button>

        <h1>I'm a post !</h1>
        
        { post.blocks.map(block => {
          const Component = typeToComponent(block.type);
          return <Component block={block} />;
        }) }

        
      </div>
    );
  }
}

export default Post;