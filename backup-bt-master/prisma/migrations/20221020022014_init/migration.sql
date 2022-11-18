-- CreateTable
CREATE TABLE "TRANSACTION_ID" (
    "transaction_id" VARCHAR(32) NOT NULL,
    "business_id" int NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (transaction_id)
);

-- CreateTable
CREATE TABLE "otp_failure" (
    "failure_id" int DEFAULT nextval('failure_id') NOT NULL,
    "authentication_id" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (failure_id)
)


-- CreateTable
CREATE TABLE "send_confirm" (
    "send_confirm_id" int DEFAULT nextval('send_confirm_id') NOT NULL,
    "user_id" int NOT NULL,
    "one_time_code" VARCHAR(32) NOT NULL,
    "valid_period" TIMESTAMP NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (send_confirm_id)
)


-- CreateTable
CREATE TABLE "send_confirm_failure" (
    "send_confirm_failure_id" int DEFAULT nextval('send_confirm_failure_id') NOT NULL,
    "user_id" int NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (send_confirm_failure_id)
)

-- CreateTable
CREATE TABLE "user_id_phone_number_disagreement" (
    "disagreement_id" int DEFAULT nextval('disagreement_id') NOT NULL,
    "user_id" int NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (send_confirm_failure_id)
)

CREATE TABLE "social_id_not_exist"
(
    "not_exist_id" int DEFAULT nextval('NOT_EXIST_ID') NOT NULL,
    "subject_claim" VARCHAR(255) NOT NULL,
    "create_at" timestamp NOT NULL,
    PRIMARY KEY (not_exist_id)
);

-- CreateTable
CREATE TABLE "backup_token" (
    "backup_token_id" int DEFAULT nextval('backup_token_id') NOT NULL,
    "backup_token" VARCHAR(32) NOT NULL,
    "user_id" int NOT NULL,
    "issue_date" TIMESTAMP NOT NULL,
    "valid_period" TIMESTAMP NOT NULL,
    "force_logout_flg"  boolean DEFAULT false NOT NULL,
    "version" int DEFAULT 0 NOT NULL,
    "is_deleted" boolean DEFAULT false NOT NULL,
    "create_at" TIMESTAMP NOT NULL,
    "update_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (backup_token_id)
)

-- CreateTable
CREATE TABLE "login_device" (
    "backup_token_id" int NOT NULL,
    "device" VARCHAR(100) NOT NULL,
    "login_date" TIMESTAMP NOT NULL,
    "version" int DEFAULT 0 NOT NULL,
    "is_deleted" boolean DEFAULT false NOT NULL,
    "create_at" TIMESTAMP NOT NULL,
    "update_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (backup_token_id)
)



-- CreateTable
CREATE TABLE "transaction_social_link" (
    "transaction_id" VARCHAR(32) NOT NULL,
    "social_id" int NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (transaction_id,social_id)
)

-- CreateTable
CREATE TABLE "subject_claim" (
    "social_id" int DEFAULT nextval('social_id') NOT NULL,
    "id_type" int NOT NULL,
    "subject_claim" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (social_id)
)

-- CreateTable
CREATE TABLE "social_token" (
    "social_id" int NOT NULL,
    "social_token" VARCHAR(1024) NOT NULL,
    "valid_period" TIMESTAMP NOT NULL,
    "version" int DEFAULT 0 NOT NULL,
    "is_deleted" boolean DEFAULT false NOT NULL,
    "create_at" TIMESTAMP NOT NULL,
    "update_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (social_id)
)

-- CreateTable
CREATE TABLE "authorization_code" (
    "social_id" int NOT NULL,
    "authorization_code" VARCHAR(32) NOT NULL,
    "nonce" VARCHAR(1024) NOT NULL,
    "code_challenge" VARCHAR(44) NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (social_id)
)

-- CreateTable
CREATE TABLE "idp_attribute" (
    "social_id" int NOT NULL,
    "email_address" VARCHAR(256) NOT NULL,
    "family_name" VARCHAR(20) NOT NULL,
    "given_name" VARCHAR(20) NOT NULL,
    "family_name_kana" VARCHAR(20) NOT NULL,
    "given_name_kana" VARCHAR(20) NOT NULL,
    "phone_number" VARCHAR(11) NOT NULL,
    "postal_code" VARCHAR(9) NOT NULL,
    "birth_date" VARCHAR(8) NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (social_id)
)

-- CreateTable
CREATE TABLE "transaction_sms_link" (
    "transaction_id" VARCHAR(32) NOT NULL,
    "sms_id" int NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (transaction_id,sms_id)
)

-- CreateTable
CREATE TABLE "otp_code" (
    "sms_id" int DEFAULT nextval('sms_id') NOT NULL,
    "phone_number" VARCHAR(11) NOT NULL,
    "otp_code" VARCHAR(6) NOT NULL,
    "valid_period" TIMESTAMP NOT NULL,
    "create_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (sms_id)
)
-- CreateTable
CREATE TABLE "sms_token" (
    "sms_id" int NOT NULL,
    "sms_token" VARCHAR(32) NOT NULL,
    "phone_number" VARCHAR(11) NOT NULL,
    "valid_period" TIMESTAMP NOT NULL,
    "version" int DEFAULT 0 NOT NULL,
    "is_deleted" boolean DEFAULT false NOT NULL,
    "create_at" TIMESTAMP NOT NULL,
    "update_at" TIMESTAMP NOT NULL,

    PRIMARY KEY (sms_id)
)



