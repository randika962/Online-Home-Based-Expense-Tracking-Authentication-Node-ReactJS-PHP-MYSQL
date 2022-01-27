SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expence_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
CREATE TABLE IF NOT EXISTS `answer` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `answer` varchar(255) NOT NULL,
  `fourm_id` int(11) NOT NULL,
  `by_id` int(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `expences`
--

DROP TABLE IF EXISTS `expences`;
CREATE TABLE IF NOT EXISTS `expences` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fu_id` int(255) NOT NULL,
  `reason_id` int(255) NOT NULL,
  `amount_spend` float(100,2) NOT NULL,
  `category` int(1) NOT NULL,
  `state` int(1) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_spend` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `family_members`
--

DROP TABLE IF EXISTS `family_members`;
CREATE TABLE IF NOT EXISTS `family_members` (
  `fu_id` int(255) NOT NULL AUTO_INCREMENT,
  `mu_id` int(255) NOT NULL,
  `income` float(10,2) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `account_type` int(1) NOT NULL,
  `state` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`fu_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `forume`
--

DROP TABLE IF EXISTS `forume`;
CREATE TABLE IF NOT EXISTS `forume` (
  `fourm_id` int(255) NOT NULL AUTO_INCREMENT,
  `quetion` varchar(255) NOT NULL,
  `asked_by_id` int(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`fourm_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `expence_id` int(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `mainusers`
--

DROP TABLE IF EXISTS `mainusers`;
CREATE TABLE IF NOT EXISTS `mainusers` (
  `mid` int(255) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255) NOT NULL,
  `registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reason_forexpences`
--

DROP TABLE IF EXISTS `reason_forexpences`;
CREATE TABLE IF NOT EXISTS `reason_forexpences` (
  `reason_id` int(255) NOT NULL AUTO_INCREMENT,
  `reason` varchar(255) NOT NULL,
  `type` int(1) NOT NULL,
  `fu_id_addedby` int(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` int(1) NOT NULL,
  PRIMARY KEY (`reason_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

