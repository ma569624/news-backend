exports.getColors = async (req, res) => {
    const {Colors} = req.models
    const mydata = await Colors.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};


