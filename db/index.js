const connection = require("./connection");

class DB {

    constructor(connection) {
        this.connection = connection;
    }

    getAllEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    insertEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    deleteEmployee(employeeId) {
        return this.connection.query(
            "DELETE FROM employee WHERE id = ?",
            employeeId
        );
    }

    getAllRoles() {
        return this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    insertRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
    }

    getAllDepartments() {
        return this.connection.query(
            "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM department LEFT JOIN role ON role.department_id = department.id LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name"
        );
    }

    insertDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
    }

}

module.exports = new DB(connection);
