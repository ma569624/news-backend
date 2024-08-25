exports.getAdvert = async (req, res) => {

    const {Advert} = req.models;

    const categoriesquery = req.query.Category;
    const iscategories = categoriesquery;
    const queryValue = req.query.Position; // Assuming Position is the correct field to query

    try {
        if (queryValue) {
            const docs = await Advert.find({ Position: { $regex: queryValue, $options: 'i' } });

            return res.status(200).json(docs);
        } else if (iscategories) {
            const docs = await Advert.find({ Category: { $regex: categoriesquery, $options: 'i' } });
            return res.status(200).json(docs);
        } else {
            const mydata = await Advert.find(req.query);
            return res.status(200).json(mydata);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred', error });
    }
};


