create table "tblListItem"
(
  "fdListItemID" integer   NOT NULL,
  "fdToDoListID" integer   NOT NULL,
  "fdUserID"     integer   NOT NULL,
  "fdDateCreate" timestamp NOT NULL,
  "fdDateDue"    timestamp NOT NULL,
  "fdDateDone"   timestamp,
  "fdCaption"    text      NOT NULL,
  "fdTagID" integer,
  constraint "tblListItem_pkey"
    primary key ("fdListItemID", "fdToDoListID", "fdUserID"),
  constraint "tblListItem_fkey"
    foreign key ("fdToDoListID", "fdUserID") references "tblToDoList",
  constraint "tblTag_fkey"
    foreign key ("fdTagID") references "tblTag"
);