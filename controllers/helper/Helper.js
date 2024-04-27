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
    return { ReporterImage, ReporterName, Heading, Matter, DatePlace, Subheading, Designation, Image, Video, Audio };
}
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

const blockkHelper = (req) => {

    let Image1, Image2;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        Image1 = `/image/${req.files.Image1[0].filename}`;
        // console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }
    if (req.files.Image2 && req.files.Image2.length > 0) {
        Image2 = `/image/${req.files.Image2[0].filename}`;
    } else {
        // Handle the case where req.files.Image2 is not defined or empty
    }

    const name = req.body.name;
    const Status = req.body.Status;
    const background1 = req.body.background1;
    const background2 = req.body.background2;
    const SectionName = req.body.SectionName;
    const SecondSection = req.body.SecondSection;

    const data = {
        Status,
        background1,
        background2,
        SectionName,
        SecondSection,
        name,
        Image1,
        Image2,
    };

    return data;
}

const RajiyaHelper = (req) => {

    let Image1, Image2;

    if (req.files.Image1 && req.files.Image1.length > 0) {
        Image1 = `/image/${req.files.Image1[0].filename}`;
        // console.log(req.files.Image1[0].filename);
    } else {
        // Handle the case where req.files.Image1 is not defined or empty
    }
    if (req.files.Image2 && req.files.Image2.length > 0) {
        Image2 = `/image/${req.files.Image2[0].filename}`;
    } else {
        // Handle the case where req.files.Image2 is not defined or empty
    }
    const Status = req.body.Status;
    // const name = req.body.name;
    const background1 = req.body.background1;
    const background2 = req.body.background2;
    const StateName = req.body.StateName;
    const FirstLink = req.body.FirstLink;

    const data = {
        Status,
        background1,
        background2,
        StateName,
        FirstLink,
        Image1,
        Image2,
    };

    return data;
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




module.exports = { ShubhkamnnaHelper, BlogHelper, TeamHelper, FounderHelper, AdvertHelper, ToplinkHelper, blockkHelper, RajiyaHelper };
