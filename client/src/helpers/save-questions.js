export default function saveQuestions(data) {
  localStorage.setItem('questions', JSON.stringify(data));
}