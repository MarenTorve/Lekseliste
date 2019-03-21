UPDATE "tblToDoList"
SET "fdShared" = $3
WHERE "fdToDoListID" = $1 and "fdUserID" = $2;