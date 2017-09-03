const queries = require('./queries');

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
      role: {
        type: 'INTEGER',
        nn: true
      }
    },
    deleter: {
      relation: {
        type: 'TEXT',
        nn: true
      },
      role: {
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
      role: {
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
      role: {
        type: 'INTEGER',
        nn: true
      }
    },
  },
  uniques: {
    mastery: ['member', 'skill'],
    inserter: ['relation', 'role'],
    deleter: ['relation', 'role'],
    updater: ['relation', 'col', 'role'],
    selecter: ['relation', 'role'],
  },
  comments: {
    table: {
      assessment: 'reports on help requests',
      change: 'log of changes to all other tables',
      deleter: 'which roles have permission to delete rows from which tables',
      domain: 'subject categories to which skills belong',
      inserter: 'which roles have permission to insert rows into which tables',
      location: 'physical parts of site where requesters are working',
      mastery: 'members’ possessions of skills',
      member: 'persons in a community served by HelpShare',
      offer: 'assertions by members of intent to provide requested help',
      phase: 'seniority categories to which members belong',
      rating: 'categories to which assessments assign help requests',
      request: 'assertions by members of desire to receive help',
      role: 'privilege categories to which members belong',
      selecter: 'which roles have permission to select from which columns of which tables',
      skill: 'item of knowledge',
      updater: 'which roles have permission to update which columns of which tables'

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
  },
  functions: {
    logger: 'CREATE FUNCTION logger'
  },
  triggers: {
    insert: 'CREATE TRIGGER log AFTER INSERT OR DELETE OR UPDATE ON member FOR EACH ROW EXECUTE PROCEDURE logger'
  }
};

// Define a function that returns a copy of the schema.
const getSchema = () => {
  return JSON.parse(JSON.stringify(schema));
};

/*
  Define a function that returns the queries to install a schema in
  the database.
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
  queries.submit(getInstallQueries(schema))
  .then(result => {
    if (result === '') {
      console.log('Schema installed.');
    }
  })
  .catch(error => {
    console.log('Error: ' + error);
  });
};

// Define a function that minimally seeds the database.
const miniseed = () => {
  const seedSpecs = {
    member: {
      fullname: 'Temporary Manager', handle: 'tempmgr', phase: 1, role: 1
    },
    phase: {description: 'staff'},
    role: {description: 'manager'},
    inserter: {relation: 'inserter', role: 'manager'}
  };
  queries.insert(1, 'member', seedSpecs.member)
  .then(value => {
    if (value === '') {
      return queries.insert(1, 'phase', seedSpecs.phase);
    }
  })
  .then(value => {
    if (value === '') {
      return queries.insert(1, 'role', seedSpecs.role);
    }
  })
  .then(value => {
    if (value === '') {
      return queries.insert(1, 'inserter', seedSpecs.inserter);
    }
  })
  .catch(error => {
    console.log('Error: ' + error);
  });
};

module.exports = {installSchema, miniseed, getSchema};
