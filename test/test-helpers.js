'use strict';

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      Table
      RESTART IDENTITY CASCADE`
  );
}

function seedTables(db, Table) {
  return db.transaction(async trx => {
    await seedTable(trx, Table);
    await trx.into('Table').insert(videos);
    await trx.raw(
      // eslint-disable-next-line quotes
      `SELECT setval('Table_id_seq', ?)`, [videos[videos.length-1].id]
    );
    }
  });
}



module.exports = {
  makeTable,
  makeBadData
  cleanTables,
  seedTable,
};