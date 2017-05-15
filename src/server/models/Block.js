
import Model from './Model';

import BlockMedia from './BlockMedia';
import Media from './Media';

class Block extends Model {
  static tableName = 'blocks';

  static jsonSchema = {
    type: 'object',
    required: ['key', 'type', 'post_id', 'data'],
    
    properties : {
      key: { type: 'string' },
      type: { type: 'string' },
      post_id: { type: 'integer' },
      data: { type: 'object' },
    },
  };

  static relationMappings = {
    medias: {
      relation: Model.ManyToManyRelation,
      modelClass: Media,
      join: {
        from: 'blocks.id',
        through: {
          from: 'blocks_medias.block_id',
          to: 'blocks_medias.media_id',
          extra: ['key'],
        },
        to: 'medias.id',
      },
    },
  };
}

export default Block;
