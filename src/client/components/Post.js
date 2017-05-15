
import React, {
  PropTypes as T,
  PureComponent,
} from 'react';

import { typeToComponent } from '../lib/blockTypes';
import Block from './Block';

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
      editMode: false,
    };
  }

  render() {
    const {
      post,
    } = this.props;

    return (
      <div>
        <h1 onClick={() => alert('fun')}>I'm a post !</h1>
        
        { post.blocks.map(block => {
          const Component = typeToComponent(block.type);
          return <Component block={block} />;
        }) }

        
      </div>
    );
  }
}

export default Post;