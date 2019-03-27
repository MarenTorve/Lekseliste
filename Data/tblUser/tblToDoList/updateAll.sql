UPDATE "tblToDoList"
SET "fdCaption" = $3
WHERE "fdToDoListID" = $1 and "fdUserID" = $2;