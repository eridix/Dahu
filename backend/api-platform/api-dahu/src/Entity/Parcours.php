<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ParcoursRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ParcoursRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(uriTemplate: '/parcours'),
        new Get(uriTemplate: '/parcours/{id}'),
        new Post(uriTemplate: '/parcours', security: "is_granted('ROLE_ADMIN')"),
        new Delete(uriTemplate: '/parcours/{id}', security: "is_granted('ROLE_ADMIN')"),
        new Patch(uriTemplate: '/parcours/{id}', security: "is_granted('ROLE_ADMIN')")
    ],
    formats: ['json'],
    normalizationContext: ['groups' => ['parcours_read']]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'description' => 'partial'])]
class Parcours
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['section_parcours_read', 'activite_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['section_parcours_read', 'parcours_read', 'activite_read'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['section_parcours_read', 'parcours_read'])]
    private ?string $image = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['section_parcours_read', 'parcours_read'])]
    private ?string $description = null;

    #[ORM\ManyToMany(targetEntity: Activite::class, mappedBy: 'parcours')]
    #[Groups(['parcours_read'])]
    private Collection $activites;

    #[ORM\ManyToOne(inversedBy: 'parcours')]
    private ?Section $section = null;

    #[ORM\OneToMany(mappedBy: 'parcours', targetEntity: Avis::class)]
    private Collection $avis;

    #[ORM\Column(nullable: true)]
    #[Groups(['section_parcours_read'])]
    private ?float $moyenne = null;

    #[ORM\ManyToOne(inversedBy: 'parcours')]
    private ?Quartier $quartier = null;

    public function __construct()
    {
        $this->activites = new ArrayCollection();
        $this->avis = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return Collection<int, Activite>
     */
    public function getActivites(): Collection
    {
        return $this->activites;
    }

    public function addActivite(Activite $activite): static
    {
        if (!$this->activites->contains($activite)) {
            $this->activites->add($activite);
            $activite->addParcours($this);
        }

        return $this;
    }

    public function removeActivite(Activite $activite): static
    {
        if ($this->activites->removeElement($activite)) {
            $activite->removeParcours($this);
        }

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

    /**
     * @return Collection<int, Avis>
     */
    public function getAvis(): Collection
    {
        return $this->avis;
    }

    public function addAvi(Avis $avi): static
    {
        if (!$this->avis->contains($avi)) {
            $this->avis->add($avi);
            $avi->setParcours($this);
        }

        return $this;
    }

    public function removeAvi(Avis $avi): static
    {
        if ($this->avis->removeElement($avi)) {
            // set the owning side to null (unless already changed)
            if ($avi->getParcours() === $this) {
                $avi->setParcours(null);
            }
        }

        return $this;
    }

    public function getMoyenne(): ?float
    {
        return $this->moyenne;
    }

    public function setMoyenne(?float $moyenne): static
    {
        $this->moyenne = $moyenne;

        return $this;
    }

    public function getQuartier(): ?Quartier
    {
        return $this->quartier;
    }

    public function setQuartier(?Quartier $quartier): static
    {
        $this->quartier = $quartier;

        return $this;
    }
}
