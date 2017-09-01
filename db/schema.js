/*
  Define a function that returns the queries to install a schema in
  the database.
*/
const schemaQueries = schema => {
  const queries = [];
  const tableNames = Object.keys(schema.tables).reverse();
  for (const tableName of tableNames) {
    queries.push(`DROP TABLE IF EXISTS ${tableName}`);
  }
  for (const tableName of tableNames.reverse()) {
    const table = schema.tables[tableName];
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
  for (const tableName of Object.keys(schema.comments.table)) {
    queries.push(
      `COMMENT ON TABLE ${tableName} IS '${schema.comments.table[tableName]}'`
    );
  }
  for (const tableName of Object.keys(schema.uniques)) {
    queries.push(
      `ALTER TABLE ${tableName} `
      + `ADD UNIQUE(${schema.uniques[tableName].join(', ')})`
    );
  }
  for (const tableName of Object.keys(schema.comments.column)) {
    for (const colName of Object.keys(schema.comments.column[tableName])) {
      queries.push(
        `COMMENT ON COLUMN ${tableName}.${colName} IS `
        + `'${schema.comments.column[tableName][colName]}'`
      );
    }
  }
  return queries;
};

// Define a function that makes a set of queries to the database.
const submitQueries = (db, queries) => {
  db.tx(context => {
    const promises = [];
    for (const query of queries) {
      promises.push(context.none(query));
    }
    return context.batch(promises);
  })
  .then(() => {
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
      relation: {
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
    },
    inserter: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      status: {
        type: 'INTEGER',
        nn: true
      }
    },
    deleter: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      status: {
        type: 'INTEGER',
        nn: true
      }
    },
    updater: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      col: {
        type: 'TEXT',
        nn: true
      },
      status: {
        type: 'INTEGER',
        nn: true
      }
    },
    selecter: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      col: {
        type: 'TEXT',
        nn: true
      },
      status: {
        type: 'INTEGER',
        nn: true
      }
    },
  },
  uniques: {
    mastery: ['member', 'skill'],
    inserter: ['relation', 'status'],
    deleter: ['relation', 'status'],
    updater: ['relation', 'col', 'status'],
    selecter: ['relation', 'status'],
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
        relation: 'name of the changed table',
        row: 'ID of the changed record',
        col: 'name of the changed column',
        old: 'value before the change (null if none)',
        new: 'value after the change (null if none)'
      }
    }
  }
};

// Define a function that installs the schema in the database.
const installSchema = () => {
  submitQueries(require('./db').db, schemaQueries(schema));
};

// Execute the function on the schema.
// installSchema();

module.exports = {installSchema, schema};
