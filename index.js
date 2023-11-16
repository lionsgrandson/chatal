function submitForm() {
  // Remove existing result div if it exists
  const existingResultDiv = document.getElementById("formResult");
  if (existingResultDiv) {
    existingResultDiv.remove();
  }

  // Array to store required fields that are empty
  const emptyFields = [];

  // Check each required field
  const requiredFields = document.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    const fieldValue = field.value.trim();
    if (!fieldValue) {
      emptyFields.push(field.id);
    }
  });

  // Display an alert if any required field is empty
  if (emptyFields.length > 0) {
    alert(`יש למלא את השדות הבאים: ${emptyFields.join(", ")}`);
  } else {
    // Check email format
    const email = document.getElementById("email").value;
    if (!isValidEmail(email)) {
      alert("יש להזין כתובת מייל תקינה.");
      return;
    }
    // Check phone format
    const phone = document.getElementById("telephone").value;
    if (!isValidPhone(phone)) {
      alert(" יש להזין מספר טלפון תקין פורמט 05X-XXX-XXXX.");
      return;
    }

    // Check date format
    const enlistmentDate = document.getElementById("enlistmentDate").value;
    if (!isValidDateFormat(enlistmentDate)) {
      alert("יש להזין תאריך גיוס בפורמט DD-MM-YYYY.");
      return;
    }
    // Check if a satisfaction level is selected
    const satisfactionLevels = document.querySelectorAll(
      'input[name="satisfaction"]'
    );
    const selectedSatisfaction = Array.from(satisfactionLevels).some(
      (level) => level.checked
    );

    if (!selectedSatisfaction) {
      alert("יש לבחור שביעות רצון.");
      return;
    }

    // Create a div to display form information
    const resultDiv = document.createElement("div");
    resultDiv.setAttribute("id", "formResult");

    // Get form data
    const formData = getFormData();

// Display form information in the div
resultDiv.innerHTML = `
  <h2>Form Information:</h2>
  <ul>
    <li>שם פרטי: ${formData.firstName}</li>
    <li>תאריך גיוס: ${formData.enlistmentDate}</li>
    <li>שם משפחה: ${formData.lastName}</li>
    <li>כתובת מגורים: ${formData.address}</li>
    <li>כתובת מייל: ${formData.email}</li>
    <li>מספר טלפון: ${formData.telephone}</li>
    <li>גיל: ${formData.age}</li>
    <li>חיל: ${ document.getElementById("branch").value}
    <li>שביעות רצון: ${formData.satisfaction}</li>
    <li>עתודאי: ${formData.isReservist ? 'כן' : 'לא'}</li>
    <li>סיסמה: ${formData.password}</li>
  </ul>`;

// Append the div under the form
    document.body.appendChild(resultDiv);
  }
}

// Function to check if the email format is valid
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to check if the date format is valid (DD-MM-YYYY)
function isValidDateFormat(date) {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  return dateRegex.test(date);
}
function isValidPhone(phone) {
  const phoneRegex = /^05\d[0-9]{3}[0-9]{4}$/;
  //   058-707-6077
  return phoneRegex.test(phone);
}

// Function to get form data
function getFormData() {
  return {
    firstName: document.getElementById("firstName").value,
    enlistmentDate: document.getElementById("enlistmentDate").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value,
    telephone: document.getElementById("telephone").value,
    age: document.getElementById("age").value,
    branch: document.getElementById("branch").value,
    satisfaction: document.querySelector('input[name="satisfaction"]:checked')
      .value,
    isReservist: document.getElementById("isReservist").checked,
    password: document.getElementById("password").value,
  };
}
