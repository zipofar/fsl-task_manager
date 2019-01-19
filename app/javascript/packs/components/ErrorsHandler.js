export function showAlert (message, response) {
  alert(`${message} ${response.status} - ${response.statusText}`);
}
