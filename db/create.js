const db = require('./db').db;
const schema = require(./schema).db;

const createMember = (doer, member) => {
  db.getStatusName(doer)
  .then(statusName => {
    if (statusName === 'manager') {
      db.one(
        `
          INSERT INTO member (fullname, handle, phase, status)
          VALUES ($1, $2, $3, $4) RETURNING id
        `, [member.fullname, member.handle, member.phase, member.status]
      )
      .then(idRow => {
        logCreation(doer, 'member', idRow.id, member, [
          'fullname', 'handle', 'phase', 'status'
        ]);
      })
      .catch(error => error);
    }
    else {
      throw new Error('createMember');
    }
  })
  .catch(error => error);
};

const createPhase = (doer, phase) => {
  db.getStatusName(doer)
  .then(statusName => {
    if (statusName === 'manager') {
      db.one(
        `INSERT INTO phase (description) VALUES ($1) RETURNING id`,
        [phase.description]
      )
      .then(idRow => {
        logCreation(doer, 'phase', idRow.id, phase, ['description']);
      })
      .catch(error => error);
    }
    else {
      throw new Error('createPhase');
    }
  })
  .catch(error => error);
};

const createStatus = (doer, status) => {
  db.getStatusName(doer)
  .then(statusName => {
    if (statusName === 'manager') {
      db.one(
        `INSERT INTO status (description) VALUES ($1) RETURNING id`,
        [status.description]
      )
      .then(idRow => {
        logCreation(doer, 'status', idRow.id, status, ['description']);
      })
      .catch(error => error);
    }
    else {
      throw new Error('createStatus');
    }
  })
  .catch(error => error);
};

module.exports = {createMember, createPhase, createStatus};
