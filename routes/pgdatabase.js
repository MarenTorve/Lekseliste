const { Pool } = require ('pg'); //postgres Api-bibliotek

const connectionData =  {
    user: 'lbngmdrxgdrbua',
    host: 'ec2-54-217-207-242.eu-west-1.compute.amazonaws.com',
    database: 'd8grr3ci9cllmn',
    password:'d9c31b7a50cd4637a66bf8a2e9ea6487e961f05c1d9328a52ccc60ea9d621569',
    port: '5432',
    ssl: 'true'
};

const pool = new Pool (connectionData);                           //forskjell stor og liten bokstav - variabel

exports.select = async function(sql, params){                     //eksporterer en funksjon som vi kaller for select - dette er egentlig en variabel
    let response = {err:undefined, rows: undefined};              // err og rows er udefinert
        await (async () => {                                      //asynkron funksjon, => det som skal ventes på
            try{                                                  //prøv å kjør connect
                const client = await pool.connect();
                const {rows} = await client.query(sql, params);   //sender sql-komando til DB og tester
                response.rows = rows;                              //returerer rader i en array
            }
            catch (e) {
                response.err = e;                                 //kommer fra interne feil
            }
        }) ().catch (e => response.err = e.stack);      //kommer her hvis det er feil fra systemene
        return response;
};

/*
SELECT * FROM "tblUser" WHERE("fdUserName" = $1)
 */