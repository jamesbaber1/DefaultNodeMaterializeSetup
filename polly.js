// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')



var generateAudio = (textToAudio) => {
    var promise = new Promise(function(resolve, reject){
    setTimeout(function() {
    


    var generateInstruments = (i) => {

        // Create an Polly client
    const Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    })
    
    
    
            let params = {
                'Text': `${textToAudio.Instruments[i].audiocontent}`,
                'OutputFormat': 'mp3',
                'VoiceId': 'Amy'
            }
        
            Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code)
                } else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                            Fs.writeFile(`./generatedFiles/audio/Instruments/${textToAudio.Instruments[i].filename}.mp3`, data.AudioStream, function(err) {
                                if (err) {
                                    return console.log(err)
                                }
                                console.log(`${i} Instruments file was saved`)
                            })
    
                        
                        
                    }
                }
            })
    
    
    
    }
    
    
    var generateInstructions = (i) => {
    
        // Create an Polly client
    const Polly = new AWS.Polly({
        signatureVersion: 'v4',
        region: 'us-east-1'
    })
    
    
    
            let params = {
                'Text': `${textToAudio.Instructions[i].audiocontent}`,
                'OutputFormat': 'mp3',
                'VoiceId': 'Amy'
            }
        
            Polly.synthesizeSpeech(params, (err, data) => {
                if (err) {
                    console.log(err.code)
                } else if (data) {
                    if (data.AudioStream instanceof Buffer) {
                            Fs.writeFile(`./generatedFiles/audio/Instructions/${textToAudio.Instructions[i].filename}.mp3`, data.AudioStream, function(err) {
                                if (err) {
                                    return console.log(err)
                                }
                                console.log(`${i} Instructions file was saved`)
                            })
    
                        
                        
                    }
                }
            })
    
    
    
    }



    for(index=0; index<textToAudio.Instruments.length; index++)
    {
        console.log(index)
        generateInstruments(index)
    }

    for(index=0; index<textToAudio.Instructions.length; index++)
    {
        console.log(index)
        generateInstructions(index)
    }

    }, 4000);
    });
    return promise;


}



module.exports = {
    generateAudio
}

