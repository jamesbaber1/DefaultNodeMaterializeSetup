const webCallbacks = require('./webCallbacks.js');
const polly = require('./polly.js');
const Fs = require('fs');


//var updateContent = (jsonFile) =>{

//load JSON File
var textToAudio = JSON.parse(Fs.readFileSync('textToAudio4.json', 'utf8'));
var urlAddress = '';

console.log(textToAudio.Instruments[0].filename)
polly.generateAudio(textToAudio)

for(index=0; index<textToAudio.Instruments.length; index++)
{
    console.log(`Uploading audio Instructions ${textToAudio.Instruments[index].filename}`)
    webCallbacks.uploadAudio(textToAudio.Instruments[index].filename);
}

for(index=0; index<textToAudio.Instruments.length; index++)
{
    console.log(`Downloading loading image Color and Masks ${textToAudio.Instruments[index].filename}`)
    webCallbacks.downloadCol(textToAudio.Instruments[index].filename);
    webCallbacks.downloadMask(textToAudio.Instruments[index].filename);
}

for(index=0; index<textToAudio.Instruments.length; index++)
{
    console.log(`Downloading loading image Color and Masks ${textToAudio.Instruments[index].filename}`)
    webCallbacks.uploadImages(textToAudio.Instruments[index].filename);
}

for(index=0; index<textToAudio.Instruments.length; index++)
{
        console.log(`Downloading loading Final image ${textToAudio.Instruments[index].filename}`)
        webCallbacks.downloadFinal(textToAudio.Instruments[index].filename);
}

    
// };

// module.exports = {
//     updateContent
// }