const db = require('./db').db;

// Define a function that installs a schema in the database.
const installSchema = schema => {
  const queries = [];
  const tableNames = Object.keys(schema.tables).reverse();
  for (const tableName of tableNames) {
    const table = schema.tables[tableName];
    console.log('Table name is ' + tableName);
    queries.push(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
    const queryCols = [];
    for (const colName in table) {
      const col = table[colName];
      queryCols.push(
        colName + ' ' + col.type
        + (col.pk ? ' PRIMARY KEY' : '')
        + (col.unique ? ' UNIQUE' : '')
        + (col.fk ? ' REFERENCES ' + col.fk : '')
        + (col.nn ? ' NOT NULL' : '')
      );
    }
    queries.push(`CREATE TABLE ${tableName} (${queryCols.join(', ')})`);
  }
  db.tx(context => {
    const promises = [];
    for (const query of queries) {
      promises.push(context.none(query));
    }
    return context.batch(promises);
  })
  .then(data => {
    db.$pool.end();
    console.log('Schema installed.');
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error: ' + error);
  });
};

// Define the schema of the database.
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
      },
      time: {
        type: 'TIMESTAMP',
        nn: true
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
        type: 'TEXT',
        nn: true
      },
      row: {
        type: 'INTEGER',
        nn: true
      },
      col: {
        type: 'TEXT',
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
  },
  comments: {
    table: {
      assessment: 'reports on help requests',
      change: 'log of changes to all other tables',
      domain: 'subject categories to which skills belong',
      location: 'physical parts of site where requesters are working',
      mastery: 'members’ possessions of skills',
      member: 'persons in a community served by HelpShare',
      offer: 'assertions by members of intent to provide requested help',
      phase: 'seniority categories to which members belong',
      rating: 'categories to which assessments assign help requests',
      request: 'assertions by members of desire to receive help',
      skill: 'item of knowledge',
      status: 'privilege categories to which members belong'
    },
    column: {
      member: {
        handle: 'Github username'
      },
      offer: {
        member: 'member making the offer'
      },
      assessment: {
        member: 'member making the assessment'
      },
      change: {
        member: 'member making the change',
        relname: 'name of the changed table',
        row: 'ID of the changed record',
        colname: 'name of the changed column',
        old: 'value before the change (null if none)',
        new: 'value after the change (null if none)'
      }
    }
  }
};

// Execute the function on the schema.
installSchema(schema);

module.exports = {installSchema, schema};
