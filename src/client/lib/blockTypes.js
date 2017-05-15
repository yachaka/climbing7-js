
import Sidephoto_quote from '../components/blocks/sidephoto_quote';
import Text from '../components/blocks/text';
import TextBlock from '../components/TextBlock';

export const allTypes = [
  'sidephoto_quote',
  'text',
];

export function typeToHuman(type) {
  switch (type) {
    case 'sidephoto_quote':
      return 'Bloc photo + texte';
    case 'text':
      return 'Texte';
  }
}

export function typeToComponent(type) {
  switch (type) {
    case 'sidephoto_quote':
      return Sidephoto_quote;
    case 'text':
      return Text;
  }
}

export function typeToDefaultData(type) {
  switch (type) {
    case 'sidephoto_quote':
      return { text: '', percentSplit: 30 };
    case 'text':
      return { title: '', text: '' };
  }
}