const express = require('express');
const app = express();
const port = 3000
const multer = require('multer');
const XLSX = require('xlsx');
const path = require('path');
const { singleOperatorRuleBuild, buildRuleFromRawString } = require('./utils/rules_helper');

const OUTPUT_PATH = './outputs/'


const upload = multer({
    dest: 'uploads/'
})

app.get('/', (req, res) => {
    res.send('Ping Pong')
})


app.post('/upload', upload.single('file'), function (req, res, next) {

    const workbook = XLSX.readFile('./uploads/' + req.file.filename);
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    const finalData = xlData.map(row => ({ ...row, Rules: JSON.stringify(buildRuleFromRawString(row['Required Tasks'])) }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(finalData);

    console.log(finalData)
    XLSX.utils.book_append_sheet(wb, ws, sheet_name_list[0]);
    XLSX.writeFile(wb, path.resolve(OUTPUT_PATH + req.file.filename + '.xlsx'));



    res.json({ data: finalData });
});





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})