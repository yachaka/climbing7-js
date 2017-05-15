
import Sidephoto_quote from '../components/blocks/sidephoto_quote';
import TextBlock from '../components/TextBlock';

export const allTypes = [
  'sidephoto_quote',
];

export function typeToHuman(type) {
  switch (type) {
    case 'sidephoto_quote':
      return 'Bloc photo + texte';
  }
}

export function typeToComponent(type) {
  switch (type) {
    case 'sidephoto_quote':
      return Sidephoto_quote;
  }
}
