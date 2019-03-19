create table "tblListItem"
(
  "fdListItemID" integer   not null,
  "fdToDoListID" integer   not null,
  "fdUserID"     integer   not null,
  "fdDateCreate" timestamp not null,
  "fdDateDue"    timestamp not null,
  "fdDateDone"   timestamp,
  "fdCaption"    text      not null,
  constraint "tblListItem_pkey"
    primary key ("fdListItemID", "fdToDoListID", "fdUserID"),
  constraint "tblListItem_fkey"
    foreign key ("fdToDoListID", "fdUserID") references "tblToDoList"
);