DELETE FROM "tblSharedToDoList" WHERE "fdToDoListID" = $1 AND "fdSharedUserID" = $2;
DELETE FROM "tblListItem" WHERE "fdToDoListID" = $1 AND "fdUserID" = $2;
DELETE FROM "tblToDoList" WHERE "fdToDoListID" = $1 AND "fdUserID" = $2;