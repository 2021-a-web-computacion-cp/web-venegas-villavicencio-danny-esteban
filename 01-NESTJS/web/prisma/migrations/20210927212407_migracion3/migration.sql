-- CreateTable
CREATE TABLE `AEROLINEA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreair` VARCHAR(191) NOT NULL,
    `anio_creacion` YEAR NOT NULL,
    `activa` BOOLEAN NOT NULL,
    `vuelo` INTEGER NOT NULL,
    `pais_origen` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
