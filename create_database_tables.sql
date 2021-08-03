CREATE DATABASE [IF NOT EXISTS] forum

CREATE TABLE `users` (
    `id` BIGINT(20) UNSIGNED UNIQUE NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
    `password` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
    `status` ENUM('active','inactive','suspended') NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
    `created_at` TIMESTAMP NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT NULL,
    PRIMARY KEY(id),
    UNIQUE INDEX `users_name_unique` (`name`)
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;

CREATE TABLE `threads` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`user_id` BIGINT(20) UNSIGNED NOT NULL,
	`title` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`body` TEXT NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`best_reply_id` BIGINT(20) UNSIGNED NULL DEFAULT NULL,
	`replies_count` INT(10) UNSIGNED NOT NULL DEFAULT '0',
	`created_at` TIMESTAMP NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY(`id`),
	INDEX `threads_user_id_foreign` (`user_id`),
	CONSTRAINT `threads_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;

CREATE TABLE `replies` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`thread_id` BIGINT(20) UNSIGNED NOT NULL,
	`user_id` BIGINT(20) UNSIGNED NOT NULL,
	`body` TEXT NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`created_at` TIMESTAMP NULL DEFAULT NULL,
	`updated_at` TIMESTAMP NULL DEFAULT NULL,
	PRIMARY KEY(`id`),
	INDEX `replies_thread_id_foreign` (`thread_id`),
	CONSTRAINT `replies_thread_id_foreign` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`),
	INDEX `replies_user_id_foreign` (`user_id`),
	CONSTRAINT `replies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;

CREATE TABLE `revoked_tokens` (
	`iat` BIGINT(20) UNSIGNED NOT NULL,
	`user_id` BIGINT(20) UNSIGNED NOT NULL,
	PRIMARY KEY (`iat`),
	INDEX `revoked_tokens_user_id_foreign` (`user_id`),
	CONSTRAINT `revoked_tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
;