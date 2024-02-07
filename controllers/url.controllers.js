const nanoid = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/url.models');
const dotenv = require('dotenv');
dotenv.config({path:'../config/.env'});

module.exports.generateShortUrl = async (req, res) => {
    const {origUrl} = req.body;
    const baseUrl = process.env.BASE_URL;

    const urlId = nanoid(7);
    if (validUrl.isUri(origUrl)) {
        try{
            let url= await Url.findOne({origUrl});
            if (url){
                res.json(url);
            }else{
                const shortUrl = `${baseUrl}/${urlId}`;
                url = new Url({
                    urlId,
                    origUrl,
                    shortUrl,
                    date: new Date(),
                });
                await url.save();
                res.json(url);
            }
        }catch (error){
            console.error(error);
            res.status(500).json('Server error');
        }
    }else{
        res.status(401).json('Invalid base url');
    };
};

module.exports.redirectUrl = async (req, res) => {
    try{
        const url = await Url.findOne({urlId: req.params.urlId});
        if (url){
            await Url.updateOne({urlId: req.params.urlId}, {$inc: {clicks: 1}});
            return res.redirect(url.origUrl);
        }else {
            return res.status(404).json('No url found');

        };
    }catch (error){
        console.error(error);
        res.status(500).json('Server error');
    }};
