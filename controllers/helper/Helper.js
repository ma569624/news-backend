const host = process.env.HOST;
const port = process.env.PORT;
const path = require("path");


const BlogHelper = (req) => {

    let Image, Video, Audio;
   

    if (req.files.Image2 && req.files.Image2.length > 0) {
        Image = `/image/${req.files.Image2[0].filename}`;
    } else {
        // Handle the case where req.files.Image2 is not defined or empty
    }
    if (req.files.Video && req.files.Video.length > 0) {
        Video = `/image/${req.files.Video[0].filename}`;
        console.log(req.files.Video[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }
    if (req.files.Audio && req.files.Audio.length > 0) {
        Audio = `/image/${req.files.Audio[0].filename}`;
        console.log(req.files.Audio[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }

    const Category = req.body.Category ? req.body.Category.replace(/[\[\]"']/g, '').split(/,(?!\s)/) : [];
    const Status = req.body.Status;
    const ReporterImage = req.body.ReporterProfile;
    const ReporterName = req.body.ReporterName;
    const Heading = req.body.Heading;
    
    const Matter = req.body.Matter;
    const DatePlace = req.body.DatePlace;
    const CreationDate = req.body.CreationDate;
    const Capton = req.body.Capton;
    const Subheading = req.body.Subheading;
    const Designation = req.body.Designation;
    const Headline = req.body.Headline;

    const data = {
        Headline,
        CreationDate,
        Status,
        ReporterImage,
        ReporterName,
        Heading,
        Matter,
        DatePlace,
        Capton,
        Subheading,
        Designation,
        Image,
        Video,
        Audio
    };
    if (Category.length > 0) {
        data.Category = Category;
    }

    return data;
    // return { Category, Status, ReporterImage, ReporterName, Heading, Matter, DatePlace, Capton, Subheading, Designation, Image, Video, Audio };
}




const ToplinkHelper = (req) => {

    let Image;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        Image = `/image/${req.files.Image1[0].filename}`;
        // console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }

    const name = req.body.name;
    const background = req.body.background;

    const data = {
        background,
        name,
        Image,
    };

    return data;
}

const TeamHelper = (req) => {

    let EmployeeImage;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        EmployeeImage = `/image/${req.files.Image1[0].filename}`;
        console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }



    const heading = req.body.heading;
    const EmployeeName = req.body.EmployeeName;
    const Status = req.body.Status;
    const EmployeeDesignation = req.body.EmployeeDesignation;
    const Place = req.body.Place;
    const EmployeeDetails = req.body.EmployeeDetails;


    return { heading, EmployeeDesignation, EmployeeDetails, Place, Status, EmployeeImage, EmployeeName };
}
const FounderHelper = (req) => {

    let EmployeeImage;

    if (req.files && req.files.Image1 && req.files.Image1.length > 0 && req.files.Image1[0].data) {
        // Read the image file from req.files.Image1[0].data
        const imageFile = req.files.Image1[0];
        
        // Convert the image file data to a base64-encoded string
        const base64Image = imageFile.data.toString('base64');
        
        // Construct the data URL with the base64-encoded image data and its MIME type
        EmployeeImage = `data:${imageFile.mimetype};base64,${base64Image}`;
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
        // or req.files.Image1[0].data is not defined
    }



    const heading = req.body.heading;
    const EmployeeName = req.body.EmployeeName;
    const Status = req.body.Status;
    const EmployeeDesignation = req.body.EmployeeDesignation;
    const EmailAddress = req.body.EmailAddress;
    const ContactNumber = req.body.ContactNumber;


    return { heading, EmployeeDesignation, ContactNumber, EmailAddress, Status, EmployeeImage, EmployeeName };
}

const AdvertHelper = (req) => {

    let Image1, Image2, Video;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        Image1 = `/image/${req.files.Image1[0].filename}`;
        console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }

    if (req.files.Image2 && req.files.Image2.length > 0) {
        Image2 = `/image/${req.files.Image2[0].filename}`;
    } else {
        // Handle the case where req.files.Image2 is not defined or empty
    }
    if (req.files.Video && req.files.Video.length > 0) {
        Video = `/image/${req.files.Video[0].filename}`;
        console.log(req.files.Video[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }

    const location = req.body.location ? req.body.location.replace(/[\[\]"']/g, '').split(/,(?!\s)/) : [];

    // const location = req.body.location;
    const url = req.body.url;
    const Status = req.body.Status;

    const data = {
        url,
        Image1,
        Image2,
        Video,
        Status
    };
    if (location.length > 0) {
        data.location = location;
    }
    return data
}




module.exports = { BlogHelper, TeamHelper, FounderHelper, AdvertHelper, ToplinkHelper };
