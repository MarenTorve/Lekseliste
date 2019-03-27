UPDATE "tblListItem"
SET "fdCaption" = $4, "fdDateCreate" = $5, "fdDateDue" = $6, "fdDateDone" = $7, "fdTagID" = $8
WHERE "fdListItemID" = $1 AND "fdToDoListID" = $2 AND "fdUserID" = $3;