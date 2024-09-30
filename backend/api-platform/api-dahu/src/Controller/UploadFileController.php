<?php

namespace App\Controller;

use App\Entity\Image;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UploadFileController extends AbstractController{

    public function __invoke(Request $request)
    {
        $image = new Image();
        $image->setAlt($request->request->get('alt'));
        $image->setImageFile($request->files->get('imageFile'));
        $image->setImageName($request->request->get('imageName'));
        return $image;
    }
}