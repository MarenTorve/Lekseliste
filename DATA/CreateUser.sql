CREATE TABLE public."tblUser"
(
    "fdUserID" SMALLSERIAL NOT NULL,
    "fdUserName" text COLLATE pg_catalog."default" NOT NULL,
    "fdPassword" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "tblUser_pkey" PRIMARY KEY ("fdUserID"),
    CONSTRAINT "tblUser_unique" UNIQUE ("fdUserName")
);