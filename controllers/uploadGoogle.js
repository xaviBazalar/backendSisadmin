const processFile = require("../middlewares/upload")
const { format } = require("util")
const { Storage } = require("@google-cloud/storage");
// Instantiate a storage client with credentials
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("project-mining");

const uploadGooglePost = async (req, res) => {
    //var bucket = await storage.createBucket('project-mining',location="us");
    //console.log(`Created ${bucket}.`);

    const { archivo } = req.files ;

    const bucketName='project-mining'
    const options = {
        destination: archivo.name,
        preconditionOpts: {ifGenerationMatch: 0},
      };

    

    try {
        
        await storage.bucket(bucketName).file(archivo.name).save(archivo.data);
        await storage.bucket(bucketName).file(archivo.name).makePublic();
        const [files] = await storage.bucket(bucketName).getFiles();

        res.json({
            validation:true,
            message: "",
            urlFile:files[0].metadata.mediaLink
        });
    } catch (error) {
        res.status(200).send({
            validation:false,
            message: "Fail to Upload the file : " + archivo.name,
            url: archivo.name,
        });
    }
  
    

      //console.log(`${archivo.name} uploaded to ${bucketName}`);

    /*const [files] = await storage.bucket(bucketName).getFiles();

    console.log('Files:');
    files.forEach(file => {
    console.log(file.name);
    });

    
      */
  
};


module.exports = {
    uploadGooglePost
};