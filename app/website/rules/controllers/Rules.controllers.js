exports.getRules = async (req, res) => {
    const {Rules} = req.models
    const mydata = await Rules.find(req.query);
    res.status(200).json(mydata);
};

