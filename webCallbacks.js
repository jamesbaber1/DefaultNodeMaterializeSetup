const cloudinary = require('cloudinary');
const http = require('http');
const fs = require('fs');
const urlExists = require('url-exists')
var check = true


cloudinary.config({ 
    cloud_name: 'dvlixmupw', 
    api_key: '728534923414189', 
    api_secret: 'xLHyeXkVkYRKyjfYEWWXGuZ0s0Q' 
  });


var uploadAudio = (fileName) => {
    setTimeout(function() {
    cloudinary.v2.uploader.upload(`./generatedFiles/audio/Instruments/${fileName}.mp3`, {resource_type: 'video', public_id: `audio/${fileName}`},
    function(error, result){console.log(result, error)});
    }, 5000);
};

var uploadImages = (fileName) => {
    setTimeout(function() {
    cloudinary.v2.uploader.upload(`./generatedFiles/imageColors/${fileName}.png`, {public_id: `${fileName}Color`},
    function(error, result){console.log(result, error)});
    cloudinary.v2.uploader.upload(`./generatedFiles/imageMasks/${fileName}.png`, {public_id: `${fileName}Mask`},
    function(error, result){console.log(result, error)});
    }, 10000);
};


var downloadCol = (fileName) => {
    setTimeout(function() {
    var file = fs.createWriteStream(`./generatedFiles/imageColors/${fileName}.png`);
    var request = http.get(`http://res.cloudinary.com/dvlixmupw/video/upload/h_160,w_600,fl_waveform,co_rgb:D9C99A,b_white/audio/${fileName}.png`, function(response) {
    response.pipe(file);});
    }, 8000);
};

var downloadMask = (fileName) => {
    setTimeout(function() {
    var file = fs.createWriteStream(`./generatedFiles/imageMasks/${fileName}.png`);
    var request = http.get(`http://res.cloudinary.com/dvlixmupw/video/upload/h_160,w_600,fl_waveform,co_black,b_white/audio/${fileName}.png`, function(response) {
    response.pipe(file);});
    }, 8000);
};

var downloadFinal = (fileName) => {
    
    

    setTimeout(function() {
        urlAddress = `http://res.cloudinary.com/dvlixmupw/image/upload/l_${fileName}Mask,fl_cutter/${fileName}Color.png`
        urlExists(urlAddress, function(err, exists) {
            if(exists===true)
            {
                var file = fs.createWriteStream(`./generatedFiles/imageFinals/${fileName}.png`);
                var request = http.get(`http://res.cloudinary.com/dvlixmupw/image/upload/l_${fileName}Mask,fl_cutter/${fileName}Color.png`, function(response) {
                response.pipe(file);});
                fs.writeFileSync('status.txt', 'success');
           }
           else
           {
                fs.writeFileSync('status.txt', 'error');
                console.log('There was an error fetching the last image.')
                process.exit()
            }
    
    })
        
    
    }, 12000);
};





module.exports = {
      uploadAudio,
      uploadImages,
      downloadCol,
      downloadMask,
      downloadFinal}