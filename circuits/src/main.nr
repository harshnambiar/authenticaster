use dep::std;





fn main(
  fid: Field,
  public_key: Field,
  note_root: pub Field,
  index: Field,
  note_hash_path: [Field; 16],
) -> pub bool {
  
  let commitment = std::hash::mimc_bn254([fid, public_key]);

  let new_root = compute_root_from_leaf(commitment, index, note_hash_path);
  assert(new_root == note_root);

  true
}


// Returns the root of the tree from the provided leaf and its hashpath, using mimc hash
fn compute_root_from_leaf(leaf : Field, index : Field, hash_path: [Field; 16]) -> Field {
    let n = hash_path.len();
    let index_bits = index.to_le_bits(n as u32);
    let mut current = leaf;
    for i in 0..n {
        let path_bit = index_bits[i] as bool;
        let (hash_left, hash_right) = if path_bit {
            (hash_path[i], current)
        } else {
            (current, hash_path[i])
        };

        current = std::hash::mimc_bn254([hash_left, hash_right]);
    };
    current
}