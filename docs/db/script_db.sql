-- MySQL Script generated by MySQL Workbench
-- ter 20 fev 2024 19:09:15
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema damasDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema damasDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `damasDB` ;
USE `damasDB` ;

-- -----------------------------------------------------
-- Table `damasDB`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `damasDB`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nomeDeUsuario` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(80) NOT NULL,
  `inicioDoPareamento` DATETIME NULL,
  `ultimaVezOnline` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nomeDeUsuario_UNIQUE` (`nomeDeUsuario` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = '\n\n';


-- -----------------------------------------------------
-- Table `damasDB`.`jogador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `damasDB`.`jogador` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `usuario_id` INT NOT NULL,
  `partida_id` INT NULL,
  `cronometro` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_jogador_partida1_idx` (`partida_id` ASC) VISIBLE,
  INDEX `fk_jogador_user1_idx` (`usuario_id` ASC) VISIBLE,
  CONSTRAINT `fk_jogador_partida1`
    FOREIGN KEY (`partida_id`)
    REFERENCES `damasDB`.`partida` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_jogador_user1`
    FOREIGN KEY (`usuario_id`)
    REFERENCES `damasDB`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `damasDB`.`partida`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `damasDB`.`partida` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vencedor` INT NULL,
  `vez` INT NOT NULL,
  `startDate` DATETIME NOT NULL DEFAULT now(),
  `endDate` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_partida_jogador1_idx` (`vencedor` ASC) VISIBLE,
  CONSTRAINT `fk_partida_jogador1`
    FOREIGN KEY (`vencedor`)
    REFERENCES `damasDB`.`jogador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_partida_jogador2`
    FOREIGN KEY (`vencedor`)
    REFERENCES `damasDB`.`jogador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `damasDB`.`peca`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `damasDB`.`peca` (
  `id` INT NOT NULL,
  `jogador_id` INT NOT NULL,
  `co_X` INT NOT NULL,
  `co_Y` INT NOT NULL,
  `rainha` TINYINT NOT NULL DEFAULT 0,
  `capturada` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_peça_jogador1_idx` (`jogador_id` ASC) VISIBLE,
  CONSTRAINT `fk_peça_jogador1`
    FOREIGN KEY (`jogador_id`)
    REFERENCES `damasDB`.`jogador` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
