// sub sequence - Recursive method
//  prints the recursive flow
// ------------------------------------------------//
//                            []
// 5 ->                     [5] []
// 1 ->               [5,1] [5] [1] []
// 7 -> [5,1,7] [5,1] [5,7] [5] [1,7] [1] [[],7],[]
// ------------------------------------------------//
let seq = [5, 1, 7];
// let seq = [1, 2, 2];
let bucket = Array();
function sequence(seq, idx, bucket, indicator) {
  if (idx >= seq.length) {
    console.log(`${indicator}:${bucket}`);
    // console.log(bucket);
    return;
  }
  console.log(bucket);
  bucket.push(seq[idx]);
  sequence(seq, idx + 1, bucket, (indicator = "pick"));
  bucket.pop();
  sequence(seq, idx + 1, bucket, (indicator = "not pick"));
}

sequence(seq, 0, bucket);
