const { Pool } = require ('pg'); //postgres Api-bibliotek

const connectionData =  {
    user: 'lbngmdrxgdrbua',
    host: 'ec2-54-217-207-242.eu-west-1.compute.amazonaws.com',
    database: 'd8grr3ci9cllmn',
    password:'d9c31b7a50cd4637a66bf8a2e9ea6487e961f05c1d9328a52ccc60ea9d621569',
    port: '5432',
    ssl: 'true'
};

//Dette er et eksempel fra Heroku sine sider!
const client = new Pool(connectionData);

//DUMMY database tabeller
exports.tblToDoList = {
  fdToDoListID: 0,
  fdUserID: 0,
  fdCaption: "",
  fdShared: false
};

exports.tblListItem = {
  fdListItemID: 0,
  fdToDoListID: 0,
  fdUserID: 0,
  fdDateCreate: "2019-01-01 00:00:00-02",
  fdDateDue: "2019-01-01 00:00:00-02",
  fdDateDone: "2019-01-01 00:00:00-02",
  fdCaption: ""
};

exports.tblSharedToDoList = {
  fdSharedUserID: 0,
  fdToDoListID: 0,
  fdUserID: 0,
  fdSharedCaption: "",
  fdFollow: false
};

exports.select = async function(aSql, aParams){             //eksporterer en funksjon som vi kaller for select - dette er egentlig en variabel
  const response = {err:undefined, rows: undefined};        // err og rows er udefinert
  try{                                                      //prøv å kjør connect
    const {rows} = await client.query(aSql, aParams);       //sender sql-komando til DB og tester
    response.rows = rows;                                   //returerer rader i en array
  }
  catch (e) {
    response.err = e;                                        //kommer fra interne feil
  }
  return response;
};

exports.insert = async function (aSql,aParams) {
  const response = {err:undefined, rows: undefined};
  try{
    await client.query('BEGIN');
    response.rows = await client.query(aSql,aParams);
    await client.query('COMMIT');
    response.rows = response.rows.rows;
  }catch (e) {
    response.err = e;
  }
  return response;
};

exports.update = async function (aSql,aParams) {
  const response = {err:undefined, rows: undefined};
  try{
    await client.query('BEGIN');
    const {rows} = await client.query(aSql,aParams);
    response.rows = rows;
    await client.query('COMMIT');
  }catch (e) {
    response.err = e;
  }
  return response;
};

exports.delete = async function (aSql,aParams) {
  const response = {err:undefined, rows: undefined};
  try{
    await client.query('BEGIN');
    response.rows = await client.query(aSql,aParams);
    await client.query('COMMIT');
    response.rows = response.rows.rows;
  }catch (e) {
    response.err = e;
  }
  return response;
};
