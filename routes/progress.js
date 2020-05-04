const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Plant = require("../models/Plant");
const ProgressPhoto = require("../models/ProgressPhoto");
const uploadCloud = require("../config/cloudinary-setup");

//not sure if this is needed
//User Homepage
router.get("/", (req, res, next) => {
  User.findById(req.res._id)
    .populate("plants")
    .populate("plantProgress")
    .then((currentUser) => {
      res.status(200).json(currentUser);
    })
    .catch((err) => res.status(500).json(err));
});

//Create (Add) new ProgressPhoto
router.post("/newPhoto", (req, res, next) => {
  ProgressPhoto.create(req.body)
    .then((photoDoc) => res.status(200).json({ plant: photoDoc }))
    .catch((err) => next(err));
});
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-
//Read (Progess Photo) Documents
router.get("/allPhotos", (req, res, next) => {
  console.log(req.user);
  //below is axios call
  ProgressPhoto.find({ owner: req.params._id })
    .then((allProgressPhotosFromDB) => {
      console.log(
        "Retrieved progress photos from DB:",
        allProgressPhotosFromDB
      );
      res.json(allProgressPhotosFromDB);
    })
    .catch((error) => {
      console.log(
        "Error while getting the progress photos from the DB: ",
        error
      );
    });
});

router.get("/allPhotos/:progressPhotoId", (req, res, next) => {
  console.log("The ID from the URL is: ", progressPhotoId);
  res.json(allPhotos);
});

router.get("allPhotos/:progressPhotoId", (req, res, next) => {
  ProgressPhoto.findOne({ _id: req.params._id })
    .then((theProgressPhoto) => {
      res.json(allPhotos, { progressPhoto: theProgressPhoto });
    })
    .catch((error) => {
      console.log("Error while retrieving progress photo: ", error);
    });
});
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-

//Update a Plant
router.post("/updateProgressPhoto/:id", (req, res, next) => {
  // console.log(req.body)
  ProgressPhoto.findByIdAndUpdate(
    req.params.id,
    {
      plant: req.body.plant,
      progressPic: req.body.progressPic,
    },
    { new: true }
  )
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Delete Plant
router.post("/deleteProgressPhoto/:id", (req, res, next) => {
  ProgressPhoto.findByIdAndRemove(req.params.id)
    .then((deletedProgressPhoto) => {
      res.json({ message: "Successfully deleted!" });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
