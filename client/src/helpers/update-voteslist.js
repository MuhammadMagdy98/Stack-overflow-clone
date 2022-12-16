export default function updateVotesList(votesList) {
  localStorage.setItem('votesList', JSON.stringify(votesList));
}
