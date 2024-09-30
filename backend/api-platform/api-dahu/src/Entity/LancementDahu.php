<?php

namespace App\Entity;

use App\Repository\LancementDahuRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LancementDahuRepository::class)]
class LancementDahu
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $guide = null;

    #[ORM\OneToOne(inversedBy: 'lancementDahu', cascade: ['persist', 'remove'])]
    private ?Section $section = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getGuide(): ?string
    {
        return $this->guide;
    }

    public function setGuide(?string $guide): static
    {
        $this->guide = $guide;

        return $this;
    }

    public function getSection(): ?Section
    {
        return $this->section;
    }

    public function setSection(?Section $section): static
    {
        $this->section = $section;

        return $this;
    }
}
