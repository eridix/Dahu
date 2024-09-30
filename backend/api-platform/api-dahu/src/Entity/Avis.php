<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\AvisRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: AvisRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(uriTemplate: '/avis', security: "is_granted('ROLE_ADMIN')"),
        new Post(uriTemplate: '/avis', security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_USER')"),
        new Delete('/avis/{id}', security: "is_granted('ROLE_ADMIN') or user == object.auteur")
    ],
    formats: ['json'],
    normalizationContext : ['groups'=>['avis_read']],
    denormalizationContext: ['groups' => ['avis_create']]
)]
#[ApiFilter(SearchFilter::class, properties: ['etat' => 'exact'])]
class Avis
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['activite_read','avis_read'])]
    private ?int $id = null;

    #[Groups(['section_activites_read', 'avis_create','activite_read','avis_read'])]
    #[ORM\Column]
    private ?int $note = null;

    #[Groups(['section_activites_read', 'avis_create','activite_read','avis_read'])]
    #[ORM\Column(type: Types::TEXT)]
    private ?string $avis = null;

    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?Parcours $parcours = null;

    #[Groups(['avis_create','avis_read'])]
    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?Activite $activite = null;

    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?Etat $etat = null;

    #[Groups(['activite_read','avis_create','avis_read'])]
    #[ORM\ManyToOne(inversedBy: 'avis')]
    private ?Utilisateur $auteur = null;

    #[Groups(['activite_read','avis_create','avis_read'])]
    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'avis')]
    private Collection $tag;

    public function __construct()
    {
        $this->tag = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNote(): ?int
    {
        return $this->note;
    }

    public function setNote(int $note): static
    {
        $this->note = $note;

        return $this;
    }

    public function getAvis(): ?string
    {
        return $this->avis;
    }

    public function setAvis(string $avis): static
    {
        $this->avis = $avis;

        return $this;
    }

    public function getAuteur(): ?Utilisateur
    {
        return $this->auteur;
    }

    public function setAuteur(?Utilisateur $auteur): static
    {
        $this->auteur = $auteur;

        return $this;
    }

    public function getParcours(): ?Parcours
    {
        return $this->parcours;
    }

    public function setParcours(?Parcours $parcours): static
    {
        $this->parcours = $parcours;

        return $this;
    }

    public function getActivite(): ?Activite
    {
        return $this->activite;
    }

    public function setActivite(?Activite $activite): static
    {
        $this->activite = $activite;

        return $this;
    }

    public function getEtat(): ?Etat
    {
        return $this->etat;
    }

    public function setEtat(?Etat $etat): static
    {
        $this->etat = $etat;

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTag(): Collection
    {
        return $this->tag;
    }

    public function addTag(Tag $tag): static
    {
        if (!$this->tag->contains($tag)) {
            $this->tag->add($tag);
        }

        return $this;
    }

    public function removeTag(Tag $tag): static
    {
        $this->tag->removeElement($tag);

        return $this;
    }

}
