
import path from 'path';
import sizeOf from 'image-size';
import fs from 'fs';

import Model from './Model';


class Media extends Model {
  static tableName = 'medias';

  static virtualAttributes = ['url', 'extension', 'size'];

  static jsonSchema = {
    type: 'object',
    required: ['filename'],
    properties: {
      filename: { type: 'string' },
    },
  };

  get url() {
    return `/uploads/${this.filename}`;
  }

  get extension() {
    return path.extname(this.filename);
  }

  get size() {
    try {
      return sizeOf(`./public/uploads/${this.filename}`);
    } catch (e) {
      return null;
    }
  }

  $afterDelete() {
    const filePath = path.resolve(__dirname + '/../../../public/uploads/' + this.filename);

    return new Promise((resolve, reject) => {
      fs.exists(filePath, (exists) => {
        if (exists) {
          fs.unlink(filePath, (err) => {
            if (err) return reject(err);
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }

}

export default Media;
