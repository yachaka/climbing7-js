
import Model from './Model';

import Block from './Block';

class Post extends Model {
  static tableName = 'posts';

  static relationMappings = {
    blocks: {
      relation: Model.HasManyRelation,
      modelClass: Block,
      join: {
        from: 'posts.id',
        to: 'blocks.post_id',
      },
    },
  };
}


export default Post;
