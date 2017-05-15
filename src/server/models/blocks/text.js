
import Block from '../Block';
import mergeAndConcat from '../../../shared/lib/mergeAndConcat';

class textModel extends Block {

  static jsonSchema = mergeAndConcat({}, Block.jsonSchema, {
    properties : {
      data: {
        required: ['text'],

        type: 'object',
        properties: {
          text: { type: 'string' },
        },
      },
    },
  });
}

export default textModel;
