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
    genre: {
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
    relevance: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      skill: {
        type: 'INTEGER',
        fk: 'skill(id)',
        nn: true
      },
      domain: {
        type: 'INTEGER',
        fk: 'domain(id)',
        nn: true
      }
    },
    claim: {
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
    call: {
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
        type: 'TIMESTAMPTZ'
      }
    },
    offer: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      call: {
        type: 'INTEGER',
        fk: 'call(id)',
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
        type: 'TIMESTAMPTZ'
      }
    },
    assessment: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      offer: {
        type: 'INTEGER',
        fk: 'offer(id)',
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
      genre: {
        type: 'INTEGER',
        fk: 'genre(id)',
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
    action: {
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
    power: {
      id: {
        type: 'SERIAL',
        pk: true
      },
      action: {
        type: 'INTEGER',
        fk: 'action(id)',
        nn: true
      },
      object: {
        type: 'TEXT',
        nn: true
      },
      property: {
        type: 'TEXT'
      },
      role: {
        type: 'INTEGER',
        fk: 'role(id)'
      }
    }
  },
  uniques: {
    relevance: ['skill', 'domain'],
    claim: ['member', 'skill'],
    roleplay: ['member', 'role'],
    power: ['action', 'object', 'property', 'role']
  },
  comments: {
    table: {
      action: 'actions that powers permit',
      assessment: 'reports on help offers',
      domain: 'subject categories to which skills belong',
      genre: 'types of log entries',
      location: 'physical parts of site where callers are working',
      log: 'log of commands and other events',
      claim: 'members’ claims to have skills',
      member: 'persons in a community served by HelpShare',
      offer: 'assertions by members of intent to provide called-for help',
      phase: 'seniority categories to which members belong',
      power: 'powers to act on records and properties',
      rating: 'categories to which assessments assign help calls',
      relevance: 'skills’ pertinence to domains',
      call: 'assertions by members of desire to receive help',
      role: 'privilege categories to which members belong',
      roleplay: 'members’ possessions of roles',
      skill: 'item of knowledge'
    },
    column: {
      assessment: {
        member: 'member making the assessment'
      },
      log: {
        member: 'member issuing the command or taking the action',
      },
      member: {
        handle: 'Github username'
      },
      offer: {
        member: 'member making the offer'
      },
      power: {
        object: 'table that is the permitted target of the action',
        property: 'column to which the action is limited, or all if null',
        role: 'empowered role, or members may act on their own records if null'
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
    role: [['description'], ['manager']],
    roleplay: [['member', 'role'], [1, 1]],
    genre: [['description'], ['query']],
    action: [['description'], ['insert']],
    power: [['action', 'object', 'role'], [1, 'power', 1]]
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
