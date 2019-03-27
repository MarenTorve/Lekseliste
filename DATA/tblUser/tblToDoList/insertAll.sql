insert into "tblToDoList" (
    "fdToDoListID",
    "fdUserID",
    "fdCaption")
values (
    (SELECT COALESCE(MAX("fdToDoListID"),0) + 1 AS "newID" FROM "tblToDoList" WHERE "fdUserID" = $1),
    $2,
    $3)
;

