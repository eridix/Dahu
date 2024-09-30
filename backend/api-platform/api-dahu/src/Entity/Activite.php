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
use App\Repository\ActiviteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Elasticsearch\Filter\OrderFilter;

#[ORM\Entity(repositoryClass: ActiviteRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        new Post(/*security: "is_granted('ROLE_ADMIN')"*/),
        new Delete(/*security: "is_granted('ROLE_ADMIN')"*/),
        new Patch(/*security: "is_granted('ROLE_ADMIN')"*/),
    ],
    formats: ['json'],
    normalizationContext: ['groups' => ['activite_read']],
    denormalizationContext: ['groups'=>['activite_write']]
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'partial', 'description' => 'partial'])]
#[ApiFilter(OrderFilter::class, properties: ['moyenne'], arguments: ['orderParameterName' => 'order'])]
class Activite
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['activite_read','section_activites_read','type_read','theme_read','pictogramme_read','image_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['activite_read','activite_write','section_activites_read','type_read','theme_read','image_read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['activite_read','activite_write','section_activites_read','type_read','theme_read'])]
    private ?string $adresse = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['activite_read','activite_write','section_activites_read','type_read','theme_read'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['activite_read','activite_write','section_activites_read','type_read','theme_read'])]
    private ?string $img = null;

    #[ORM\ManyToMany(targetEntity: Pictogramme::class, inversedBy: 'activites')]
    #[Groups(['activite_read','activite_write','section_activites_read','type_read','theme_read'])]
    private Collection $pictogrammes;

    #[ORM\ManyToMany(targetEntity: Parcours::class, inversedBy: 'activites')]
    #[Groups(['activite_read'])]
    private Collection $parcours;

    #[ORM\OneToMany(mappedBy: 'activite', targetEntity: Avis::class)]
    #[Groups(['activite_read','section_activites_read'])]
    private Collection $avis;

    #[ORM\OneToMany(mappedBy: 'activite', targetEntity: Question::class)]
    #[Groups(['activite_read'])]
    private Collection $question;

    #[ORM\Column(nullable: true)]
    #[Groups(['activite_read','section_activites_read','type_read','theme_read'])]
    private ?float $moyenne = null;

    #[ORM\ManyToOne(inversedBy: 'activites')]
    #[Groups(['activite_read','section_activites_read','activite_write'])]
    private ?Quartier $quartier = null;

    #[ORM\ManyToOne(inversedBy: 'activites')]
    #[Groups(['activite_read','activite_write','section_activites_read'])]
    private ?Type $type = null;

    #[ORM\ManyToOne(inversedBy: 'activites')]
    #[Groups(['activite_read', 'activite_write'])]
    private ?Section $section = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['section_activites_read', 'activite_read', 'activite_write'])]
    private ?string $telephone = null;

    #[Groups(['activite_write'])]
    #[ORM\ManyToMany(targetEntity: Image::class, inversedBy: 'activites')]
    private Collection $images;

    #[ORM\Column(nullable:true)]
    #[Groups(['section_activites_read','type_read','theme_read', 'activite_read', 'activite_write'])]
    private ?bool $coup_de_coeur = null;


    public function __construct()
    {
        $this->pictogrammes = new ArrayCollection();
        $this->parcours = new ArrayCollection();
        $this->avis = new ArrayCollection();
        $this->question = new ArrayCollection();
        $this->images = new ArrayCollection();
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

    public function getAdresse(): ?string
    {
        return $this->adresse;
    }

    public function setAdresse(string $adresse): static
    {
        $this->adresse = $adresse;

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

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(string $img): static
    {
        $this->img = $img;

        return $this;
    }

    /**
     * @return Collection<int, Pictogramme>
     */
    public function getPictogrammes(): Collection
    {
        return $this->pictogrammes;
    }

    public function addPictogramme(Pictogramme $pictogramme): static
    {
        if (!$this->pictogrammes->contains($pictogramme)) {
            $this->pictogrammes->add($pictogramme);
        }

        return $this;
    }

    public function removePictogramme(Pictogramme $pictogramme): static
    {
        $this->pictogrammes->removeElement($pictogramme);

        return $this;
    }


    /**
     * @return Collection<int, Parcours>
     */
    public function getParcours(): Collection
    {
        return $this->parcours;
    }

    public function addParcours(Parcours $parcour): static
    {
        if (!$this->parcours->contains($parcour)) {
            $this->parcours->add($parcour);
        }

        return $this;
    }

    public function removeParcours(Parcours $parcour): static
    {
        $this->parcours->removeElement($parcour);

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

    public function addAvis(Avis $avi): static
    {
        if (!$this->avis->contains($avi)) {
            $this->avis->add($avi);
            $avi->setActivite($this);
        }

        return $this;
    }

    public function removeAvis(Avis $avi): static
    {
        if ($this->avis->removeElement($avi)) {
            // set the owning side to null (unless already changed)
            if ($avi->getActivite() === $this) {
                $avi->setActivite(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestion(): Collection
    {
        return $this->question;
    }

    public function addQuestion(Question $question): static
    {
        if (!$this->question->contains($question)) {
            $this->question->add($question);
            $question->setActivite($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): static
    {
        if ($this->question->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getActivite() === $this) {
                $question->setActivite(null);
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

    public function setType(?Type $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getType(): ?Type
    {
        return $this->type;
    }

    public function getTelephone(): ?string
    {
        return $this->telephone;
    }

    public function setTelephone(?string $telephone): static
    {
        $this->telephone = $telephone;

        return $this;
    }

    public function isCoupDeCoeur(): ?bool
    {
        return $this->coup_de_coeur;
    }

    public function setCoupDeCoeur(bool $coup_de_coeur): static
    {
        $this->coup_de_coeur = $coup_de_coeur;

        return $this;
    }


    public function addImage(Image $image): static
    {
        if (!$this->images->contains($image)) {
            $this->images->add($image);
        }

        return $this;
    }

    public function removeImage(Image $image): static
    {
        $this->images->removeElement($image);

        return $this;
    }
}
