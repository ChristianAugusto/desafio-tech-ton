DROP DATABASE IF EXISTS `desafio-tech-ton`;


CREATE DATABASE IF NOT EXISTS `desafio-tech-ton`;


CREATE TABLE IF NOT EXISTS `desafio-tech-ton`.`employees` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `birthDate` DATE NOT NULL,
    `jobTitle` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
);
