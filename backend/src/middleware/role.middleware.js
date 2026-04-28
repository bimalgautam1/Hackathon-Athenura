/**
  role.middleware.js
  Restricts routes by role, such as admi-only, judge-only, or university-only access, student
 */
//admin, judge, university, student are the roles that we have defined in the database. We will use these roles to restrict access to certain routes. For example, only admin can access the route to create a new user, only judge can access the route to view the submissions, only university can access the route to view the students, and only student can access the route to view the challenges.