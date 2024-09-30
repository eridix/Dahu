<?php

namespace App\Repository;

use App\Entity\LancementDahu;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<LancementDahu>
 *
 * @method LancementDahu|null find($id, $lockMode = null, $lockVersion = null)
 * @method LancementDahu|null findOneBy(array $criteria, array $orderBy = null)
 * @method LancementDahu[]    findAll()
 * @method LancementDahu[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LancementDahuRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, LancementDahu::class);
    }

//    /**
//     * @return LancementDahu[] Returns an array of LancementDahu objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('l.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?LancementDahu
//    {
//        return $this->createQueryBuilder('l')
//            ->andWhere('l.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
