export const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const getRoomId = (firstUser, secondUser) => {
  const sortedIds = [firstUser, secondUser].sort();
  const roomId = sortedIds.join('-');
  return roomId;
}
export const formatDate = date => {
  var day = date.getDate();
  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var month = monthNames[date.getMonth()];
  var formatDate = day + ' ' + month;
  return formatDate;
}