import { configure } from '@kadira/storybook';

const req = require.context('../src/components/', true, /story\.js/);

configure(() => req.keys().forEach(req), module);
