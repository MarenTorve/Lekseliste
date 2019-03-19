CREATE TABLE public."tblToDoList"
(
    "fdToDoListID" integer NOT NULL, 
    "fdUserID" integer NOT NULL,
    "fdCaption" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "tblToDoList_pkey" PRIMARY KEY ("fdToDoListID", "fdUserID"),
    CONSTRAINT "tblToDoList_fkey" FOREIGN KEY ("fdUserID") REFERENCES "tblUser"("fdUserID")
); 