const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const JWT = process.env.JWT;

const pinFileToIPFS = async () => {
    const formData = new FormData();
    const folder = "files/";
    const suffix = ".json";
    const src = "Winkelhorn-";

    const start = 10; 
    const range = 1;
    
    for (var i = start; i < (start + range); i++ ){
        const fileName = src + 
                (i < 10 ? "0" : i) + (i > 9 ? "" : i);

        const filePath = folder + fileName + suffix;
        // console.log(fileName + " " + filePath);

        const file = fs.createReadStream(filePath);

        formData.append('file', file);
        
        const pinataMetadata = JSON.stringify({
            name: fileName
        });

        formData.append('pinataMetadata', pinataMetadata);
        
        const pinataOptions = JSON.stringify({
          cidVersion: 0,
        });

        formData.append('pinataOptions', pinataOptions);

        try{
            const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
              maxBodyLength: "Infinity",
              headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
              }
            });
            console.log(filePath);
            console.log(res.data);
      
          } catch (error) {
            console.error(error);

          }      
    }
}

pinFileToIPFS();