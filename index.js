const inquirer = require('inquirer');
const db = require("./db");
require("console.table");

function startAPP() {
    console.log('You have now entered the Database')
    startPrompts();
}

async function startPrompts() {
    const { choice } = await inquirer.prompt([
        {
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "Add Employee",
                    value: "Add_Employee"
                },
                {
                    name: "Add Role",
                    value: "Add_Role"
                },
                {
                    name: "Add Department",
                    value: "Add_Department"
                },
                {
                    name: "Remove Employee",
                    value: "Remove_Employee"
                },
                {
                    name: "Exit",
                    value: "Exit"
                }
            ]
        }
    ]);

    switch (choice) {
        case "Add_Employee":
            return addEmployee();
        case "Add_Role":
            return addRole();
        case "Add_Department":
            return addDepartment();
        case "Remove_Employee":
            return deleteEmployee();
        default:
            return Exit();
    }
}

async function addEmployee() {
    const roles = await db.getAllRoles();
    const employees = await db.getAllEmployees();

    const employee = await inquirer.prompt([
        {
            name: "first_name",
            message: "Enter the first name of the employee"
        },
        {
            name: "last_name",
            message: "Enter the last name of the employee"
        }
    ]);

    const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await inquirer.prompt({
        type: "list",
        name: "roleId",
        message: "enter the role",
        choices: roleChoices
    });

    employee.role_id = roleId;

    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));
    managerChoices.unshift({ name: "None", value: null });

    const { managerId } = await inquirer.prompt({
        type: "list",
        name: "managerId",
        message: "Select the Manager",
        choices: managerChoices
    });

    employee.manager_id = managerId;

    await db.insertEmployee(employee);

    console.log(
        `${employee.first_name} ${employee.last_name} has now been added to the database`
    );

    startPrompts();
}


async function addRole() {
    const departments = await db.getAllDepartments();

    const departmentChoices = departments.map(({ id, name }) => ({
        name: name,
        value: id
    }));

    const role = await inquirer.prompt([
        {
            name: "title",
            message: "Enter the title of the role"
        },
        {
            name: "salary",
            message: "Enter the salary"
        },
        {
            type: "list",
            name: "department_id",
            message: "Enter department",
            choices: departmentChoices
        }
    ]);

    await db.insertRole(role);

    console.log(`${role.title} has now been added to the database`);

    startPrompts();
}

async function addDepartment() {
    const department = await inquirer.prompt([
        {
            name: "name",
            message: "Enter the name of the department"
        }
    ]);

    await db.insertDepartment(department);

    console.log(`${department.name} has now been added to the database`);

    startPrompts();
}

async function deleteEmployee() {
    const employees = await db.getAllEmployees();

    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message: "Enter the name of the employee you wish to delete",
            choices: employeeChoices
        }
    ]);

    await db.deleteEmployee(employeeId);

    console.log("Employee has been deleted");

    startPrompts();
}

function Exit() {
    console.log("You are now leaving the database");
    process.exit();
}


startAPP();