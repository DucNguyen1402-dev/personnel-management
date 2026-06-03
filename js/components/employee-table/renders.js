/**
 * Generates the HTML string template for a single table row representation of an employee.
 * @param {Object} employee - The employee record instance.
 * @param {string|number} employee.id - Unique identifier for the employee row container.
 * @param {string} employee.account - Employee account identifier.
 * @param {string} employee.name - Full name of the employee.
 * @param {string} employee.email - Email address.
 * @param {string} employee.workDate - Formatted starting work date.
 * @param {string} employee.positionLabel - Visual display label for the position.
 * @param {number|string} employee.totalSalary - Calculated total salary output.
 * @param {string} employee.rank - Calculated performance rank.
 * @returns {string} HTML `<tr>` string markup template.
 */
export function renderEmployeeRow(employee) {
  return `
  <tr data-id="${employee.id}">
  <td>${employee.account}</td>
  <td>${employee.name}</td>
  <td>${employee.email}</td>
  <td>${employee.workDate}</td>
  <td>${employee.positionLabel}</td>
  <td>${employee.totalSalary}</td>
  <td>${employee.rank}</td>
  <td>
    <button
      class="btn btn-warning btn-sm"
      data-action="edit"
      data-toggle="modal"
      data-target="#myModal"
    >
      Sửa
    </button>
    <button class="btn btn-danger btn-sm" data-action="delete">Xóa</button>
  </td>
</tr>
  `;
}

/**
 * Returns an HTML row displayed when no employees are found.
 *
 * @param {string} [message="Không tìm thấy nhân viên phù hợp"] - Message to display.
 * @param {number} [columnCount=8] - Number of table columns to span.
 * @returns {string} HTML string for the not-found row.
 */
export function renderNotFoundRow(
  message = "Không tìm thấy nhân viên phù hợp",
  columnCount = 8
) {
  return `
    <tr>
      <td colspan="${columnCount}">
        <div class="flex flex-col items-center justify-center py-12 text-center">
          <div class="text-4xl">🔍</div>
          <p class="mt-3 text-lg font-semibold text-gray-600">
            ${message}
          </p>
          <p class="mt-1 text-sm text-gray-400">
            Hãy thử từ khóa khác hoặc kiểm tra lại dữ liệu.
          </p>
        </div>
      </td>
    </tr>
  `;
}