import { configure } from '@kadira/storybook';

const req = require.context('../src/components/', true, /story\.jsx$/);

configure(function () {
	req.keys().forEach(req);
}, module);
