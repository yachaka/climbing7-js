
import Model from './Model';

class BlockMedia extends Model {
  static tableName = 'blocks_medias';
  static idColumn = ['block_id', 'media_id'];

  static jsonSchema = {
    type: 'object',
    required: ['block_id', 'media_id', 'key'],
    
    properties : {
      block_id: { type: 'string' },
      media_id: { type: 'string' },
      key: { type: 'string' },
    },
  };
}

export default BlockMedia;
