import { atom } from 'recoil';

export const viewImageState = atom({
  key: 'viewimagestate',
  default: {
    url: {},
    name: '',
  },
});
