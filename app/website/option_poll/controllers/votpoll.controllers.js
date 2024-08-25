exports.getvotpoll = async (req, res) => {
    const {votpoll} = req.models
    const mydata = await votpoll.find(req.query);
    // console.log(mydata)
    res.status(200).json(mydata);
};


