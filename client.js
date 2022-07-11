console.log('client.js has been loaded');
let employees = [];

$(document).ready(onReady);

function onReady() {
    console.log('jquery is ready!');
    $('#addEmployee').on('click', handleNewEmployee);
    $('#employeeRows').on('click', '.deleteButton', deleteEmployee);
    appendColors();
}

function handleNewEmployee() {
    console.log('new employee was added!');
    const newEmployee = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        employeeId: $('#employeeId').val(),
        title: $('#title').val(),
        annualSalary: $('#annualSalary').val(),
    };
    console.log(newEmployee);
    employees.push(newEmployee);
    console.log(employees);
    renderEmployeeList();
    updateMonthlyTotal();
    $('.employeeInput').val('');
}

function renderEmployeeList() {
    $('#employeeRows').empty();
    employees.forEach(function (employee) {
        $('#employeeRows').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>

                <td>${employee.title}</td>
                <td>${employee.annualSalary}</td>
                <td>
                    <button class="deleteButton" data-id="${employee.employeeId}">
                        Delete
                    </button>
                </td>
            </tr> 
        `);
    });
}

function updateMonthlyTotal() {
    let sum = 0;
    console.log('updating monthly total');
    employees.forEach(function(employee) {
        sum += employee.annualSalary / 12;
    });
    $('#monthlyContainer').text(`Total Monthly Salary: $${sum}`);
}

function deleteEmployee() {
    console.log('delete button has been clicked');
    // let employeeId = $(this).parent().prev().prev().prev().text();
    let employeeId = Number($(this).data().id);
    // let employeeId = Number($(this).data('taco'));
    console.log(employeeId);
    // remove employee
    let updatedEmployeeArray = [];
    employees.forEach(function(employee) {
        if(Number(employee.employeeId) !== employeeId) {
            updatedEmployeeArray.push(employee);
        }
    });
    employees = updatedEmployeeArray;
    // display all employees
    renderEmployeeList();
    // update total
    updateMonthlyTotal();
}

// not employee related
let colors = [
    {
        english: 'red',
        spanish: 'roho',
    },
    {
        english: 'yellow',
        spanish: 'amarillo',
    },
    {
        english: 'blue',
        spanish: 'azul'
    }
];

function appendColors() {
    colors.forEach(appendSingleColor);
};

function appendSingleColor(someArrayElement, index) {
    $('#colorContainer').append(`
        <p class="color" data-id="${index}" data-spanish="${someArrayElement.spanish}>${someArrayElement.english}</p>
    `)
    // let pTag = $(`<p class="color" data-id="${index}" data-spanish="${someArrayElement.spanish}>${someArrayElement.english}</p>`);
    // pTag.data('spanish', someArrayElement.spanish);
    // $('#colorContainer').append(pTag);
}

