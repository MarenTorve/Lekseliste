UPDATE "tblListItem"
SET "fdCaption" = $4, "fdDateDue" = $5
WHERE "fdListItemID" = $1 AND "fdToDoListID" = $2 AND "fdUserID" = $3;