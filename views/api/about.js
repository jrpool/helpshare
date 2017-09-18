/*
  Define a function that returns the API response to a request to create
  an about.
*/
const _create = (requester, result) => {
  if (typeof result === 'object') {
    return `Error (about/post):\n${result.message}\n${result.detail}\n`;
  }
  else {
    return (
      result
        ? `Member ${requester} created about ${result.id}, `
          + `assigning skill ${result.skill} to domain ${result.domain}.\n`
        : `Member ${requester} may not create abouts.\n`
    );
  }
}

/*
  Define a function that returns the API response to a request to delete
  an about.
*/
const _delete = (requester, result) => {
  if (typeof result === 'object') {
    return `Error (about/delete):\n${result.message}\n${result.detail}\n`;
  }
  else {
    return (
      result
        ? `Member ${requester} deleted about ${result.id}, which had `
        + `assigned skill ${result.skill} to domain ${result.domain}.\n`
        : `Member ${requester} may not delete abouts.\n`
    );
  }
}

/*
  Define a function that returns the API response to a request to update
  an about.
*/
const _update = (requester, property, result) => {
  if (typeof result === 'object') {
    return `Error (about/update):\n${result.message}\n${result.detail}\n`;
  }
  else {
    return (
      result
        ? `Member ${requester} updated about ${result.id}, changing its `
        + `${property} to ${result[property]}.\n`
        : `Member ${requester} may not update the ${property} of an about.\n`
    );
  }
}

module.exports = {_create};
