const router = require('express').Router();
const mongoose = require('mongoose');
const checkToken = require('../middleware').checkToken;
const Marker = require('../models/Marker');
const axios = require('axios');


router.post('/save-markers' , checkToken , async (req, res , next) => {
    const {userId, markers} = req.body;

    if (userId && markers) {
        try {
        let data = await Promise.all([markers.map(m=>new Marker({
            _id: new mongoose.Types.ObjectId(),
            lat: m.lat,
            long: m.lng,
            description: m.description || '',
            userId,
        }).save())]);

        res.status(201).json({
            message: "marker were saved",
            success: true,
        });

    } catch(e) {
        res.status(500).json({
            message: "server error",
            success: false,
        })
    }

    } else {
        res.status(409).json({
            message: "marker wasn't save",
            success: false,
        });
    }
});

router.post('/save-marker', checkToken , async (req , res , next) => {
    const {userId, lat , long, description} = req.body;
    if (userId && lat && long) {

        const marker =  new Marker({
            _id: new mongoose.Types.ObjectId(),
            userId,
            lat,
            long,
            description,
        });

        try {
            const result = await marker.save();
            res.status(201).json({
                message: "marker was saved",
                success: true,
            });
        } catch (e) {
            res.status(500).json({
                message: "server error",
                success: false,
            })
        }
    } else {
        res.status(409).json({
            message: "marker wasn't save",
            success: false,
        });
    }
});

router.post('/get-markers', checkToken,  async (req , res , next) => {
    const {userId} = req.body;

    if (userId) {
        const result = await Marker.find({userId})
            .select('_id lat long description').exec();

        res.status(200).json({
            results: result,
        });
    } else {
        res.status(409).json({
            message: "Can't get markers",
            success: false,
        });
    }
});

router.post('/near' ,  checkToken, async(req , res , next) => {
    const {location , radius, type } = req.body;

    let data = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json' , {
        params: {
            location,
            radius,
            type,
            key: 'AIzaSyAsLpsUoiPOdtXGHgR3zljyeJCXKTxCOcg'
        }
    })
    const result = data.data.results.map(g=>({
        lat: g.geometry.location.lat,
        lng: g.geometry.location.lng,
        name: g.name,
    }));
   
    res.status(200).json({data : result});
});


module.exports = router;