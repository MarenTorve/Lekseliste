UPDATE "tblListItem"
SET "fdDateDone" = $4
WHERE "fdListItemID" = $1 AND "fdToDoListID" = $2 AND "fdUserID" = $3;