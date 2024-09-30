<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\SectionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;

#[ORM\Entity(repositoryClass: SectionRepository::class)]
#[ApiResource(
    operations: [
        new Get(uriTemplate: '/sections/{id}/activites', normalizationContext: ['groups' => 'section_activites_read']),
        new Get(uriTemplate: '/sections/{id}/themes', normalizationContext: ['groups' => 'section_themes_read']),
        new Get(uriTemplate: '/sections/{id}/parcours', normalizationContext: ['groups' => 'section_parcours_read']),
        new Get(),
        new GetCollection(),
        new Post(security: "is_granted('ROLE_ADMIN')"),
        new Patch(security: "is_granted('ROLE_ADMIN')")
    ],
    formats: ['json'],
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'exact'])]
#[UniqueEntity('name')]
class Section
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['activite_read','theme_read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['section_themes_read', 'section_activites_read', 'section_parcours_read', 'activite_read'])]
    private ?string $name = null;

    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Parcours::class)]
    #[Groups('section_parcours_read')]
    private Collection $parcours;

    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Quartier::class)]
    private Collection $quartiers;

    #[Groups('section_activites_read')]
    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Activite::class)]
    #[ORM\OrderBy(['moyenne'=>'desc'])]
    private Collection $activites;

    #[Groups('section_themes_read')]
    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Theme::class)]
    private Collection $themes;

    #[ORM\OneToMany(mappedBy: 'section', targetEntity: Partenaire::class)]
    private Collection $partenaires;

    #[ORM\OneToOne(mappedBy: 'section', cascade: ['persist', 'remove'])]
    private ?LancementDahu $lancementDahu = null;

    #[ORM\ManyToMany(targetEntity: Equipe::class, mappedBy: 'section')]
    private Collection $equipes;


    public function __construct()
    {
        $this->parcours = new ArrayCollection();
        $this->quartiers = new ArrayCollection();
        $this->activites = new ArrayCollection();
        $this->themes = new ArrayCollection();
        $this->partenaires = new ArrayCollection();
        $this->equipes = new ArrayCollection();
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

    /**
     * @return Collection<int, Parcours>
     */
    public function getParcours(): Collection
    {
        return $this->parcours;
    }

    public function addParcour(Parcours $parcour): static
    {
        if (!$this->parcours->contains($parcour)) {
            $this->parcours->add($parcour);
            $parcour->setSection($this);
        }

        return $this;
    }

    public function removeParcour(Parcours $parcour): static
    {
        if ($this->parcours->removeElement($parcour)) {
            // set the owning side to null (unless already changed)
            if ($parcour->getSection() === $this) {
                $parcour->setSection(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Quartier>
     */
    public function getQuartiers(): Collection
    {
        return $this->quartiers;
    }

    public function addQuartier(Quartier $quartier): static
    {
        if (!$this->quartiers->contains($quartier)) {
            $this->quartiers->add($quartier);
            $quartier->setSection($this);
        }

        return $this;
    }

    public function removeQuartier(Quartier $quartier): static
    {
        if ($this->quartiers->removeElement($quartier)) {
            // set the owning side to null (unless already changed)
            if ($quartier->getSection() === $this) {
                $quartier->setSection(null);
            }
        }

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
            $activite->setSection($this);
        }

        return $this;
    }

    public function removeActivite(Activite $activite): static
    {
        if ($this->activites->removeElement($activite)) {
            // set the owning side to null (unless already changed)
            if ($activite->getSection() === $this) {
                $activite->setSection(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Theme>
     */
    public function getThemes(): Collection
    {
        return $this->themes;
    }

    public function addTheme(Theme $theme): static
    {
        if (!$this->themes->contains($theme)) {
            $this->themes->add($theme);
            $theme->setSection($this);
        }

        return $this;
    }

    public function removeTheme(Theme $theme): static
    {
        if ($this->themes->removeElement($theme)) {
            // set the owning side to null (unless already changed)
            if ($theme->getSection() === $this) {
                $theme->setSection(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Partenaire>
     */
    public function getPartenaires(): Collection
    {
        return $this->partenaires;
    }

    public function addPartenaire(Partenaire $partenaire): static
    {
        if (!$this->partenaires->contains($partenaire)) {
            $this->partenaires->add($partenaire);
            $partenaire->setSection($this);
        }

        return $this;
    }

    public function removePartenaire(Partenaire $partenaire): static
    {
        if ($this->partenaires->removeElement($partenaire)) {
            // set the owning side to null (unless already changed)
            if ($partenaire->getSection() === $this) {
                $partenaire->setSection(null);
            }
        }

        return $this;
    }

    public function getLancementDahu(): ?LancementDahu
    {
        return $this->lancementDahu;
    }

    public function setLancementDahu(?LancementDahu $lancementDahu): static
    {
        // unset the owning side of the relation if necessary
        if ($lancementDahu === null && $this->lancementDahu !== null) {
            $this->lancementDahu->setSection(null);
        }

        // set the owning side of the relation if necessary
        if ($lancementDahu !== null && $lancementDahu->getSection() !== $this) {
            $lancementDahu->setSection($this);
        }

        $this->lancementDahu = $lancementDahu;

        return $this;
    }

    /**
     * @return Collection<int, Equipe>
     */
    public function getEquipes(): Collection
    {
        return $this->equipes;
    }

    public function addEquipe(Equipe $equipe): static
    {
        if (!$this->equipes->contains($equipe)) {
            $this->equipes->add($equipe);
            $equipe->addSection($this);
        }

        return $this;
    }

    public function removeEquipe(Equipe $equipe): static
    {
        if ($this->equipes->removeElement($equipe)) {
            $equipe->removeSection($this);
        }

        return $this;
    }
}
