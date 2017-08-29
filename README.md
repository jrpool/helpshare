# helpshare

Database-backed web application demonstrating cooperative help management.

## Project Members

[Jonathan Pool](https://github.com/jrpool)

## Discussion

### Requirements

This application addresses the following imaginary requirements:

Our on-site community has about 100 members, each classified as to (1) phase and (2) status.

Members seek to acquire most or all of a list of about 400 listed skills, which are classified as to domain.

Members pursue the skills in different sequences and at different paces. By design, all members both learn and help others learn. At any time, when a member experiences difficulty acquiring a skill, other members who have that skill are expected to help.

One of the obstacles to the exchange of help is a lack of coordination and transparency. Imagine that you are a learner wanting help with skill 328. How should you request it? Should you broadcast your request or direct it to a specific potential helper? If the former, won’t the community experience intolerable message traffic? If the latter, to whom? How can you know which other members already have that skill? How will a potential helper know whether another member has already agreed to help you? How will your request be retired when resolved?

Members currently record their skill acquisitions in a central database and have access only to their own skill records.

We want a web application that facilitates the giving and receiving of help in this situation. In the first trial version of the application, we want it to make the following things true:

0. Members with status “manager” can add, delete, amend, and reclassify members.

1. Members with status “expert” can add, delete, amend, and reclassify skills.

2. Any member wanting help with a skill can open a request. Because the site is large enough to interfere with a helper finding a requester, the request specifies where on the site the requester is located. The request optionally also includes a comment. The request remains open until terminated. Its maker can amend its location and/or its comment, or terminate it, while it is open.

3. Any member other than the maker of a request can make a help offer for an open request. The offer remains open until terminated. Its maker can terminate it. If an open request is terminated, all open offers for it are automatically terminated.

4. The member who has made a request and each member who has made a help offer for the request can create an assessment for the request. The assessment has a type and an optional comment.

5. All members can see the following facts:

```
I. ENTITIES

A. Members:
a. ID.
b. Name.
c. Handle.
d. Phase.
e. Status.

B. Phases:
a. ID.
b. Description.

C. Statuses:
a. ID.
b. Description.

D. Skills:
a. ID.
b. Domain.
c. Description.

E. Domains:
a. ID.
b. Description.

F. Masteries:
a. ID.
b. Member.
c. Skill.

G. Locations:
a. ID.
b. Description.

H. Ratings:
a. ID.
b. Description.

II. EVENTS

A. Requests:
a. ID.
b. Skill.
c. Date and time.
d. Member.
e. Location.
f. Comment.

B. Offers:
a. ID.
b. Request.
c. Maker.
d. Date and time.

C. Assessments:
a. ID.
b. Request.
c. Reporter.
d. Rating.
e. Comment.

D. Changes:
a. ID.
b. Date and time.
c. Maker.
d. Thing changed.
e. Property changed.
f. Old value.
g. New value.

III. INTEGRATIONS

Reports that members would likely want, combining and summarizing the above facts.
```

We envision that subsequent versions will include additional features. Some features likely to be subsequently required are:

```
- Notifications to potential helpers.
- Suspension of requests during times when requesters are unavailable.
- Classification of members into on-call and regular statuses.
- Assignments of helping duties for particular requests to on-call members.
- Addition of modules (study units) as entities, with associated skills.
- Addition of member groups as entities capable of making help requests.
- Automatic termination of requests determined to be stale.
- Status-based limitations of visibilities of some facts and changes.
```

The developers may consider these possible future extensions in their design of the initial version.

## Implementation

The above requirements are modeled with 12 interrelated objects. A summary of the main objects and their relationships is shown in this diagram:

<img src='summary.png' alt='relationships among members, skills, requests, and help'>

### Project Origin

This application was created in fulfillment of the requirements of the “Pizza Restaurant: RDB Schema with CRUD API” module (Module 98) in Phase 3 of the [Learners Guild][lg] curriculum.

As the module’s title suggests, the requirement is to model aspects of a pizza restaurant and develop a database and API to satisfy a set of specifications related to such an operation.

However, the module also states, “Please feel free to adapt the content of the data to your personal preferences or adjust your schema to support any other data types or operations you can think of. Get creative!” The above requirements were adopted under the license granted by that statement.

### Implementation notes

## Installation and Configuration

0. These instructions presuppose that (1) [npm][npm] and [PostgreSQL][pg] are installed, (2) there is a PostgreSQL database cluster, (3) PostgreSQL is running, and (4) when you connect to the cluster you are a PostgreSQL superuser.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named `helpshare`, by executing:

    `git clone https://github.com/jrpool/helpshare.git helpshare`

3. Make the project directory your working directory by executing:

    `cd helpshare`

4. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

5. To create the database, execute `npm run db_reset`.

6. If you wish to define a custom encryption key for the session IDs that the application stores in client cookies, execute `echo SECRET=customkey > .env`, where you replace `customkey` with the string of your choice.

7. If you wish to put some sample data into the database, execute `npm run load_seeds`.

8. To start the application, execute `npm start`.

9. To access the application while it is running, use a web browser to request this URL:

`http://localhost:3000/`

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/
[pg]: https://www.postgresql.org/
