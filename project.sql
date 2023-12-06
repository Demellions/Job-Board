-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 22 oct. 2023 à 21:24
-- Version du serveur : 5.7.39
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `project`
--

-- --------------------------------------------------------

--
-- Structure de la table `advertisement`
--

CREATE TABLE `advertisement` (
  `id_advertisement` int(11) NOT NULL,
  `employeur` varchar(50) NOT NULL,
  `type_de_poste` varchar(255) NOT NULL,
  `remuneration` float NOT NULL,
  `date_plubi` date DEFAULT NULL,
  `details` text NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `contrat_type` varchar(50) NOT NULL,
  `duree_contrat` int(11) NOT NULL,
  `teletravail` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `advertisement`
--

INSERT INTO `advertisement` (`id_advertisement`, `employeur`, `type_de_poste`, `remuneration`, `date_plubi`, `details`, `adresse`, `contrat_type`, `duree_contrat`, `teletravail`) VALUES
(18, 'carrefourhejeekje', 'rayon y', 2366, '2023-10-11', 'no', 'ici', 'CDI', 3, NULL),
(21, 'camaieu', 'rayon', 2366, '2023-10-11', 'no', 'ici', 'CDI', 3, NULL),
(22, 'action', 'rayon', 2366, '2023-10-11', 'no', 'ici', 'CDI', 3, NULL),
(24, 'burger king', 'rayon', 2366, '2023-10-11', 'no', 'ici', 'CDI', 3, NULL),
(25, 'Glenat', 'libraire', 200, '2023-10-18', 'beaucoup de choses', 'confluence', 'CDD', 3, 1);

-- --------------------------------------------------------

--
-- Structure de la table `ad_info`
--

CREATE TABLE `ad_info` (
  `id_people` int(11) DEFAULT NULL,
  `id_advertisement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `ah`
--

CREATE TABLE `ah` (
  `nom` int(11) NOT NULL,
  `ah` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `ah`
--

INSERT INTO `ah` (`nom`, `ah`) VALUES
(2, 3),
(3, 6);

-- --------------------------------------------------------

--
-- Structure de la table `companies`
--

CREATE TABLE `companies` (
  `id_companie` int(11) NOT NULL,
  `name_company` varchar(150) NOT NULL,
  `adresse` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `people`
--

CREATE TABLE `people` (
  `id_people` int(11) NOT NULL,
  `user` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name_people` varchar(48) NOT NULL,
  `prenom` varchar(48) NOT NULL,
  `type_poste` varchar(200) NOT NULL,
  `mail` varchar(250) NOT NULL,
  `portable` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `people`
--

INSERT INTO `people` (`id_people`, `user`, `password`, `name_people`, `prenom`, `type_poste`, `mail`, `portable`) VALUES
(7, 'raven', '$2b$12$YD39ILMsfu.rmTKe0XoWS.2/MQtYHcynxM.hF1UL40OcRGNKAliXi', 'Marwannn', 'mahrujue', 'clasher royal', 'marwan@gmail.com', '56789'),
(10, 'str', '$2b$12$W57XdNraMfJysepBViyW8O5yrkwgpC3BjDP5MStthSMFXZlNDrlIm', 'string', 'string', 'string', 'string@gmail.com', '0'),
(11, 'Demellions', '$2b$12$BXBxqE9Dhx2dNOAfQB8r8uv6Dq/yHL5/N4Kk0OdS3UXXC6UFd5JwS', 'Wanne', 'Kauldi', 'dev', 'wanne@gmail.com', '786542517'),
(18, 'Gojo', '$2b$12$4np.S.xvF5A3GifpPjvdY.z3eYHTxE0esehM9Vsat3yPJLvDo8Una', 'Gojo', 'Satoru', 'ah', 'satorugojo@gmail.com', '123456789'),
(19, 'Audran', '$2b$12$qKBoRjhDzCXzvlyhyZ9AUOyIqmr08zyoxY7P4BmRgZ42ik8AsDwh.', 'Parthiot', 'Audran', 'pute', 'audran@gmail.com', '12345678'),
(28, 'tqt', '$2b$12$rLvPFbsu45sv42Jd1XUl0uXglgHGtHEL4/rAZAhXCGBMdRf5/t4Ym', 'Yves', 'Eugene', 'Laid', 'yves@co.com', '9876543234');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `advertisement`
--
ALTER TABLE `advertisement`
  ADD PRIMARY KEY (`id_advertisement`);

--
-- Index pour la table `ad_info`
--
ALTER TABLE `ad_info`
  ADD KEY `id_people` (`id_people`),
  ADD KEY `id_advertisement` (`id_advertisement`);

--
-- Index pour la table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id_companie`);

--
-- Index pour la table `people`
--
ALTER TABLE `people`
  ADD PRIMARY KEY (`id_people`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD UNIQUE KEY `user` (`user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `advertisement`
--
ALTER TABLE `advertisement`
  MODIFY `id_advertisement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `companies`
--
ALTER TABLE `companies`
  MODIFY `id_companie` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `people`
--
ALTER TABLE `people`
  MODIFY `id_people` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ad_info`
--
ALTER TABLE `ad_info`
  ADD CONSTRAINT `ad_info_ibfk_1` FOREIGN KEY (`id_people`) REFERENCES `people` (`id_people`),
  ADD CONSTRAINT `ad_info_ibfk_2` FOREIGN KEY (`id_advertisement`) REFERENCES `advertisement` (`id_advertisement`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
