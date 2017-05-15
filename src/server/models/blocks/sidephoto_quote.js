
import merge from 'lodash.merge';
import path from 'path';

import Block from '../Block';
import mergeAndConcat from '../../lib/mergeAndConcat';
import isImageMimeType from '../../lib/isImageMimeType';
import SingleMediaStrategy from '../../lib/SingleMediaStrategy';

class sidephoto_quoteModel extends Block {

  static jsonSchema = mergeAndConcat(Block.jsonSchema, {
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

  static mediasStrategies = {
    photo: SingleMediaStrategy('photo'),
  }
}

export default sidephoto_quoteModel;
