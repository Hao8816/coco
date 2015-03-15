-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: localhost    Database: coco
-- ------------------------------------------------------
-- Server version	5.6.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `blog` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` blob,
  `creator_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `topic_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES ('1426384361941','a9bf2a3fbf9525b090ed866ce398149b53137343','测试1','这是我的第一个博客','[]','12345',NULL,1),('1426384461480','d734cec008fe7a7794ac3af5ef303528829542f3','测试2','格式化(format)是指对磁盘或磁盘中的分区（partition）进行初始化的一种操作，这种操作通常会导致现有的磁盘或分区中所有的文件被清除。格式化通常分为低级格式化和高级格式化。如果没有特别指明，对硬盘的格式化通常是指高级格式化，而对软盘的格式化则通常同时包括这两者。','[]','12345',NULL,2),('1426384645670','407ab82076b6ad7802d75b83acb7e9452c8ad505','AngularJS 是什么？','AngularJS诞生于2009年，由Misko Hevery 等人创建，后为Google所收购。是一款优秀的前端JS框架，已经被用于Google的多款产品当中。AngularJS有着诸多特性，最为核心的是：MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入，等等。','[]','12345',NULL,3),('1426384764356','9e6a518d33570aa72c36e412c37c589cd494fe57','红玫瑰（陈奕迅演唱歌曲）','这首歌是台湾填词人李焯雄根据张爱玲的小说《红玫瑰与白玫瑰》所填。讲的是每个男人心中都有两个女人，一个纯情，一个风骚，而红玫瑰象征风骚。“也许每一个男子全都有过这样的两个女人，至少两个。娶了红玫瑰，久而久之，红的变了墙上的一抹蚊子血，白的还是床前明月光；娶了白玫瑰，白的便是衣服上沾的一粒饭黏子，红的却是心口上一颗朱砂痣，”出自张爱玲的小说《红玫瑰与白玫瑰》。《红玫瑰》的粤语版歌曲是《白玫瑰》。','[]','12345',NULL,4),('1426384908227','09f6a581f16f541f9b753233843c7b711ee5f39b','吉他','吉他（意大利语：Chitarra），又译为结他或六弦琴。是一种弹拨乐器，通常有六条弦，形状与提琴相似。\n吉他在流行音乐、摇滚音乐、蓝调、民歌、佛朗明哥中，常被视为主要乐器。而在古典音乐的领域里，吉他常以独奏或二重奏的型式演出；当然，在室内乐和管弦乐中，吉他亦扮演着相当程度的陪衬角色。\n古典吉他与小提琴、钢琴并列为世界著名三大乐器。','[]','12345',NULL,5),('1426384998673','8d8efc7c2bac1f42804584337ec6893ee4c614e9','阴天（莫文蔚演唱歌曲）','作品由李宗盛作词，李宗盛和他当时乐队的领班周国仪合作作曲。和早期的李宗盛作品的简洁相比，《阴天》的文字要长了许多，但其对环境和心理描写的细腻程度，却绝对令人发指。而周国仪合作的作曲，也赋予了早期李宗盛民谣式写作不同的现代感和华彩感 。','[]','12345',NULL,6),('1426385308846','3f926963916ba0eccb36db9d550908220a978c8d','《匆匆那年》是北京小马奔腾影业2014年出品的校园爱情片，改编自九夜茴同名小说。','《匆匆那年》是北京小马奔腾影业2014年出品的校园爱情片，改编自九夜茴同名小说。该影片由张一白执导，彭于晏、倪妮、郑恺、魏晨、张子萱、陈赫等人主演。该影片讲述了阳光少年...','[]','12345',NULL,7),('1426385402796','caa1cf4bdc043e1ca42e4fd37902475e4810a215','node.js','Node.js 是一个基于Chrome JavaScript 运行时建立的一个平台， 用来方便地搭建快速的 易于扩展的网络应用· Node.js 借助事件驱动， 非阻塞I/O 模型变得轻量和高效， 非常适合 运行在分布式设备 的 数据密集型 的实时应用。\nV8引擎执行Javascript的速度非常快，性能非常好。Node对一些特殊用例进行了优化，提供了替代的API，使得V8在非浏览器环境下运行得更好。','[]','12345',NULL,8),('1426385516638','38a9d507df820cd177e92cd0730f0b1df0e002e0','CNode:Node.js专业中文社区','目前有哪些比较好二次开发的NODEJS的WEB系统? 8 / 231 1小时前 问答 使用Node.js做即时通信服务端 那么音频、图片应该如何传输?','[]','12345',NULL,9);
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `concern`
--

DROP TABLE IF EXISTS `concern`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `concern` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `topic_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `block` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `concern`
--

LOCK TABLES `concern` WRITE;
/*!40000 ALTER TABLE `concern` DISABLE KEYS */;
/*!40000 ALTER TABLE `concern` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friend`
--

DROP TABLE IF EXISTS `friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friend` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `friend_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `my_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `block` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic`
--

DROP TABLE IF EXISTS `topic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `topic` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `desc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `images` blob,
  `creator_sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `related` blob,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic`
--

LOCK TABLES `topic` WRITE;
/*!40000 ALTER TABLE `topic` DISABLE KEYS */;
/*!40000 ALTER TABLE `topic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `time` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sha1` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `head_image` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nb_friend` float DEFAULT NULL,
  `nb_blog` float DEFAULT NULL,
  `nb_topic` float DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-03-15 22:19:28
