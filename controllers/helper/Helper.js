const host = process.env.HOST;
const port = process.env.PORT;
const path = require("path");

const ShubhkamnnaHelper = (req) => {
    // const ReporterImage = `http://localhost:5000/image/${req.files.Image1[0].filename}`;
    // const Image = `http://localhost:5000/image/${req.files.Image2[0].filename}`;
    let ReporterImage, Image, Video, Audio;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        ReporterImage = `/image/${req.files.Image1[0].filename}`;
        console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }

    if (req.files.Image2 && req.files.Image2.length > 0) {
        Image = `/image/${req.files.Image2[0].filename}`;
    } else {
        // Handle the case where req.files.Image2 is not defined or empty
    }

    if (req.files.Video && req.files.Video.length > 0) {
        ReporterImage = `/image/${req.files.Image1[0].filename}`;
        console.log(req.files.Video[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }
    if (req.files.Video && req.files.Audio.length > 0) {
        ReporterImage = `/image/${req.files.Image1[0].filename}`;
        console.log(req.files.Audio[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }
    
    const StateName = req.body.StateName;
    const ReporterName = req.body.ReporterName;
    const Heading = req.body.Heading;
    const Matter = req.body.Matter;
    const DatePlace = req.body.DatePlace;
    const Subheading = req.body.Subheading;
    const Designation = req.body.Designation;
    // return { ReporterName, Heading, Matter, DatePlace, Subheading, Designation };
    return { ReporterImage, ReporterName, Heading, Matter, DatePlace, Subheading, Designation, Image, Video,Audio };
}
const BlogHelper = (req) => {

    let ReporterImage, Image, Video, Audio;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        ReporterImage = `/image/${req.files.Image1[0].filename}`;
        console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }

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
    const StateName = req.body.StateName;
    const Category = req.body.Category;
    const Status = req.body.Status;
    const ReporterName = req.body.ReporterName;
    const Heading = req.body.Heading;
    const Matter = req.body.Matter;
    const DatePlace = req.body.DatePlace;
    const Capton = req.body.Capton;
    const Subheading = req.body.Subheading;
    const Designation = req.body.Designation;
    const Position = req.body.Position;

    return { StateName, Category, Status, ReporterImage, ReporterName, Heading, Matter, DatePlace, Capton, Subheading, Designation, Position, Image, Video, Audio };
}

const TeamHelper = (req) => {

    let  EmployeeImage;

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
    

    return { heading, EmployeeDesignation, EmployeeDetails, Place, Status, EmployeeImage,EmployeeName };
}

module.exports = { ShubhkamnnaHelper, BlogHelper, TeamHelper };
