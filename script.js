function addEmployee(event) {
  event.preventDefault();

  //  Input form data
  let empFname = document.getElementById('firstName').value;
  allLetter(empFname);
  let empLname = document.getElementById('lastName').value;
  let empId = document.getElementById('id').value;
  let empTitle = document.getElementById('title').value;
  let empAnnual = Number(document.getElementById('annualSalary').value);
  let employeeInfo = document.getElementById('employee-info');

  //  Render employee row
  employeeInfo.innerHTML += `
  <tbody>
    <tr class="employee-info-content">
        <td>${empFname}</td>
        <td>${empLname}</td>
        <td>${empId}</td>
        <td>${empTitle}</td>
        <td class="employee-annual-data">$${numberWithCommas(empAnnual)}</td>
        <td>
            <button onClick="deleteEmployee(event)">Delete
            </button>
        </td>
    </tr>
  </tbody>`;
  //  Calculate employee cost
  calcEmpCost();
}

// TODO: EventListner for Input to Convert w/ Commas

// const input = document.querySelector('input');
// const log = document.getElementById('values');
// input.addEventListener('input', updateValue);
// function updateValue(e) {
//   log.textContent = e.target.value;
// }

function numberWithCommas(x) {
  x = x.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
  return x;
}

function calcEmpCost() {
  let empMonthlyCostTotal = document.getElementById('employee-monthly-cost');
  let empAnnualDataClass = document.getElementsByClassName(
    'employee-annual-data'
  );

  let empMonthlyTotal; // Single monthly salary
  let empAllNum = []; //  All salaries
  let total = 0; // Total cost

  // Get single emp salary and push into a collection
  for (let i = 0; i < empAnnualDataClass.length; i++) {
    let commaToNumConversion = empAnnualDataClass[i].innerText;
    let stringValue = commaToNumConversion.replace(/\,/g, '');
    let valueToNum = stringValue.replace('$', '');
    empAllNum.push(Number(valueToNum));
  }

  //  Calculate total
  for (let j = 0; j < empAllNum.length; j++) {
    total += Number(empAllNum[j]);
  }
  empMonthlyTotal = total / 2;

  // Render total cost
  empMonthlyCostTotal.innerHTML = `<p id="employee-monthly-cost">$${empMonthlyTotal.toLocaleString()}</p>`;

  // Over-budget calculation
  if (empMonthlyTotal >= 20000) {
    // Render over-budget
    empMonthlyCostTotal.innerHTML = `<p id="employee-monthly-cost" class="over-budget">$${empMonthlyTotal.toLocaleString()}</p>`;

    let footerWarning = document.getElementById('footer-warning');
    footerWarning.classList.add('over-budget');
  }
}

// Input form string validation for: empFname, empLname, empTitle
function allLetter(inputTxt) {
  if (!inputTxt) {
    alert('Please input correct information.');
    employeeInfo.remove();
  }
  for (let i = 0; i < inputTxt.length; i++) {
    let letters = /^[A-Za-z]+$/;
    if (!inputTxt[i].match(letters)) {
      alert(
        'First Name, Last Name and Title only accepts string values. Please try again.'
      );
      employeeInfo.remove();
      return false;
    }
  }
}

function deleteEmployee(event) {
  const toDelete = event.target;
  toDelete.closest('.employee-info-content').remove();
  toDelete.remove();
  console.log(toDelete);
  calcEmpCost();
}
