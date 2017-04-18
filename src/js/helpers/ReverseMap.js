export default function ReverseMap(obj) {
  var res = {}, k;

  for (k in obj) {
    res[obj[k]] = k;
  }

  return res;
}
