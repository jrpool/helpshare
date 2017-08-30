const db = require('./db').db;

const installSchema = schema => {
  const queries = [];
  for (const table in schema.tables) {
    queries.push(`DROP TABLE IF EXISTS ${table}`);
    const queryCols = [];
    for (const col in schema.tables[table]) {
      queryCols.push(
        col + col.type
        + (col.pk ? ' PRIMARY KEY' : '')
        + (col.unique ? ' UNIQUE' : '')
        + (col.fk ? ' REFERENCES ' + col.fk : '')
        + (col.nn ? ' NOT NULL' : '')
      );
    }
    queries.push(`CREATE TABLE ${table} (${queryCols.join(', ')})`);
  }
  db.task(context => {
    const promises = [];
    for (const query of queries) {
      promises.push(context.none(query));
    }
    Promise.all(promises)
    .then(() => {
      console.log('Schema installed.');
    })
    .catch(error => error);
  });
};

const schema = {
  tables: {
    phase: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      description: {
        type: 'TEXT',
        unique: true,
        nn: true
      }
    },
    status: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      description: {
        type: 'TEXT',
        unique: true,
        nn: true
      }
    },
    location: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      description: {
        type: 'TEXT',
        unique: true,
        nn: true
      }
    },
    domain: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      description: {
        type: 'TEXT',
        unique: true,
        nn: true
      }
    },
    rating: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      description: {
        type: 'TEXT',
        unique: true,
        nn: true
      }
    },
    skill: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      domain: {
        type: 'INTEGER',
        fk: 'domain(id)',
        nn: true
      },
      description: {
        type: 'TEXT',
        unique: true,
        nn: true
      }
    },
    member: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      fullname: {
        type: 'TEXT',
        nn: true
      },
      handle: {
        type: 'TEXT',
        unique: true,
        nn: true
      },
      phase: {
        type: 'INTEGER',
        fk: 'phase(id)',
        nn: true
      },
      status: {
        type: 'INTEGER',
        fk: 'status(id)',
        nn: true
      }
    },
    mastery: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      skill: {
        type: 'INTEGER',
        fk: 'skill(id)',
        nn: true
      }
    },
    request: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      skill: {
        type: 'INTEGER',
        fk: 'skill(id)',
        nn: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      location: {
        type: 'INTEGER',
        fk: 'location(id)',
        nn: true
      },
      comment: {
        type: 'TEXT'
      },
      started: {
        type: 'TIMESTAMP',
        nn: true
      },
      ended: {
        type: 'TIMESTAMP',
        nn: true
      }
    },
    offer: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      request: {
        type: 'INTEGER',
        fk: 'request(id)',
        nn: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      started: {
        type: 'TIMESTAMP',
        nn: true
      },
      ended: {
        type: 'TIMESTAMP',
        nn: true
      }
    },
    assessment: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      request: {
        type: 'INTEGER',
        fk: 'request(id)',
        nn: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      rating: {
        type: 'INTEGER',
        fk: 'rating(id)',
        nn: true
      },
      comment: {
        type: 'TEXT'
      }
    },
    change: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      time: {
        type: 'TIMESTAMP',
        nn: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      relname: {
        type: 'NAME',
        fk: 'pg_class(relname)',
        nn: true
      },
      row: {
        type: 'integer',
        nn: true
      },
      column: {
        type: 'NAME',
        fk: 'pg_attribute(attname)',
        nn: true
      },
      old: {
        type: 'TEXT',
        nn: true
      },
      new: {
        type: 'TEXT',
        nn: true
      }
    }
  }
};

installSchema(schema);

module.exports = {installSchema, schema};
