<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Repository\UtilisateurRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Exception\JWTDecodeFailureException;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class TokenDecoderController extends AbstractController
{
    public function __construct(
        private readonly TokenStorageInterface    $tokenStorage,
        private readonly JWTTokenManagerInterface $tokenManager
    )
    {
    }

    public function __invoke(UtilisateurRepository $utilisateurRepository): Utilisateur|string
    {
        try {
            $token = $this->tokenManager->decode($this->tokenStorage->getToken());
            $email = $token["email"];
            return $utilisateurRepository->findOneBy(array('email' => $email));
        } catch (JWTDecodeFailureException $JWTDecodeFailureException) {
            return $JWTDecodeFailureException->getMessage();
        }
    }
}
