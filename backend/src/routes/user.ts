import { Router } from "express";
import { GalleryController } from "../controllers/GalleryController";
import {
   UpdateGalleryErr,
   UpdateGalleryRules
   } from '../middleware/validators/AllValidators';



const Gallery = new GalleryController(); 

const router = Router();


router.post("/create-gallery", Gallery.create);
router.get("/list-gallery", Gallery.index);
router.patch('/update-gallery/:id',UpdateGalleryRules(),UpdateGalleryErr, Gallery.update);
router.delete('/delete/:id([0-9]+)',Gallery.delete);

export default router;