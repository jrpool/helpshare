const db = require('./db').db;
const log = require('./log');
const PQ = require('pg-promise').ParameterizedQuery;

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
    role: {
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
    class: {
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
      phase: {
        type: 'INTEGER',
        fk: 'phase(id)',
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
        fk: 'phase(id)'
      }
    },
    roleplay: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      role: {
        type: 'INTEGER',
        fk: 'role(id)',
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
        type: 'TIMESTAMPTZ',
        nn: true
      },
      ended: {
        type: 'TIMESTAMPTZ',
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
        type: 'TIMESTAMPTZ',
        nn: true
      },
      ended: {
        type: 'TIMESTAMPTZ',
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
        type: 'TIMESTAMPTZ',
        nn: true
      }
    },
    log: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      time: {
        type: 'TIMESTAMPTZ',
        nn: true
      },
      member: {
        type: 'INTEGER',
        fk: 'member(id)',
        nn: true
      },
      class: {
        type: 'INTEGER',
        fk: 'class(id)',
        nn: true
      },
      content: {
        type: 'TEXT',
        nn: true
      },
      addendum: {
        type: 'TEXT'
      }
    },
    add_row: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      role: {
        type: 'INTEGER',
        fk: 'role(id)',
        nn: true
      }
    },
    kill_row: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      role: {
        type: 'INTEGER',
        fk: 'role(id)',
        nn: true
      }
    },
    change_col: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      col: {
        type: 'TEXT',
        nn: true
      },
      role: {
        type: 'INTEGER',
        fk: 'role(id)',
        nn: true
      }
    },
    read_col: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      col: {
        type: 'TEXT',
        nn: true
      },
      role: {
        type: 'INTEGER',
        fk: 'role(id)',
        nn: true
      }
    },
  },
  uniques: {
    mastery: ['member', 'skill'],
    roleplay: ['member', 'role'],
    add_row: ['relation', 'role'],
    kill_row: ['relation', 'role'],
    change_col: ['relation', 'col', 'role'],
    read_col: ['relation', 'role'],
  },
  comments: {
    table: {
      assessment: 'reports on help requests',
      class: 'types of log entries',
      kill_row: 'powers to delete rows from tables',
      domain: 'subject categories to which skills belong',
      add_row: 'powers to insert rows into tables',
      location: 'physical parts of site where requesters are working',
      log: 'log of commands and other events',
      mastery: 'members’ possessions of skills',
      member: 'persons in a community served by HelpShare',
      offer: 'assertions by members of intent to provide requested help',
      phase: 'seniority categories to which members belong',
      rating: 'categories to which assessments assign help requests',
      request: 'assertions by members of desire to receive help',
      read_col: 'powers to select columns from tables',
      role: 'privilege categories to which members belong',
      roleplay: 'members’ possessions of roles',
      skill: 'item of knowledge',
      change_col: 'powers to update columns of tables'

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
      log: {
        member: 'member issuing the command or taking the action',
      }
    }
  }
};

// Define a function that returns a copy of the schema.
const getSchema = () => {
  return JSON.parse(JSON.stringify(schema));
};

/*
  Define a function that makes, and optionally logs, a batch of queries
  returning no result within a transaction. Each query may be a string
  or a parameterized query object.
*/
const batchSubmit = (requester, queries, areLogged) => {
  const finalQueries = queries.slice();
  if (areLogged) {
    const logQueries = queries.map(query => {
      return log.getQueryQuery(requester, query);
    });
    finalQueries.push(...logQueries);
  }
  return db.tx(context => {
    const promises = [];
    for (const query of finalQueries) {
      promises.push(context.none(query));
    }
    return context.batch(promises);
  })
  .then(results => {
    db.$pool.end();
    console.log(`Query batch (size ${results.length}) submitted.`);
    return '';
  })
  .catch(error => {
    db.$pool.end();
    console.log('Error (batchSubmit): ' + error);
  });
};

/*
  Define a function that returns the queries to install a schema in a
  database.
*/
const getInstallQueries = schema => {
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
        + (
          col.fk
            ? ' REFERENCES ' + col.fk + ' DEFERRABLE INITIALLY DEFERRED'
            : ''
        )
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

// Define a function that installs the schema in the database.
const installSchema = () => {
  batchSubmit(1, getInstallQueries(getSchema()), false)
  .then(result => {
    if (result === '') {
      console.log('Schema installed.');
    }
  })
  .catch(error => {
    console.log('Error (installSchema): ' + error);
  });
};

// Define a function that returns the queries to minimally seed the database.
const getMiniseedQueries = () => {
  const specs = {
    member: [['fullname', 'handle'], ['Temporary Manager', 'tempmgr']],
    phase: [['description'], ['staff']],
    role: [['description'], ['manager']],
    roleplay: [['member', 'role'], [1, 1]],
    class: [['description'], ['query']],
    add_row: [['relation', 'role'], ['add_row', 1]]
  };
  return Object.keys(specs).map(table => {
    const colList = specs[table][0].join(', ');
    const valParamList
      = specs[table][1].map((v, index) => '$' + (index + 1)).join(', ');
    return new PQ(
      `INSERT INTO ${table} (${colList}) VALUES (${valParamList})`,
      specs[table][1]
    );
  });
};

// Define a function that minimally seeds the database.
const miniseed = () => {
  batchSubmit(1, getMiniseedQueries(), true)
  .then(result => {
    if (result === '') {
      console.log('Database minimally seeded.');
    }
  })
  .catch(error => {
    console.log('Error (miniseed): ' + error);
  });
};

module.exports = {
  getInstallQueries, getMiniseedQueries, getSchema, installSchema, miniseed
};
