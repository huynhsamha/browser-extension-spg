const fs = require('fs');
const path = require('path');

let data = [];
for (let i=6;i<128;i++) data.push(`<option value="${i}">${i}</option>`);

fs.writeFileSync(path.join(__dirname, './out.html'), data.join('\n'));