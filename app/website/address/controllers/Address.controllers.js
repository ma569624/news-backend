exports.getAddress = async (req, res) => {
    try {
        const {Address} = req.models
        const mydata = await Address.find(req.query);
        res.status(200).json(mydata);
    } catch (error) {
        res.status(500).json({message: error});
    }
};


