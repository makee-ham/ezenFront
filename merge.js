const a = [3, 7, 13, 19, 25, 30];
const b = [5, 15, 20, 27];
const c = [];

const merge = (a1, a2, merged) => {
  for (let i = 0; i < a1.length; ) {
    for (let j = 0; j < a2.length; ) {
      if (a1[i] > a2[j]) {
        merged.push(a2[j]);
        j++;
      } else {
        merged.push(a1[i]);
        i++;
      }
    }
  }
  return merged;
};

console.log(merge(a, b, c));
