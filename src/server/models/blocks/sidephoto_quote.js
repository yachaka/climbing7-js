
import merge from 'lodash.merge';
import path from 'path';

import Block from '../Block';
import mergeAndConcat from '../../../shared/lib/mergeAndConcat';
import isImageMimeType from '../../lib/isImageMimeType';
import SingleMediaStrategy from '../../lib/SingleMediaStrategy';

class sidephoto_quoteModel extends Block {

  static jsonSchema = mergeAndConcat({}, Block.jsonSchema, {
    properties : {
      data: {
        required: ['text', 'percentSplit'],

        type: 'object',
        properties: {
          text: { type: 'string' },
          percentSplit: { type: 'number' },
        },
      },
    },
  });

  static mediasStrategies = {
    photo: SingleMediaStrategy('photo'),
  }
}

export default sidephoto_quoteModel;
