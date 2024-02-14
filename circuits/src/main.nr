use dep::std;

// Adjusted Noir program example

fn main(public leaf: Field, public index: u32, public hash_path: [Field; 2], public merkle_root: Field) {
    let computed_root = compute_merkle_root(leaf, index, hash_path);
    // Use assertion to validate Merkle root; there's no need to return a value
    assert(computed_root == merkle_root, "Merkle root verification failed.");
}

// Adjusted to use u32 for index to allow bitwise operations
fn compute_merkle_root(leaf: Field, index: u32, hash_path: [Field; 2]) -> Field {
    let mut current = leaf;
    for i in 0..2 {
        // Adjusted path_bit calculation
        let path_bit = (index >> i) & 1;
        current = if path_bit == 1 {
            hash(current, hash_path[i])
        } else {
            hash(hash_path[i], current)
        };
    }
    current
}

// Using MiMC hash function from the standard library
fn hash(a: Field, b: Field) -> Field {
    std::hash::mimc_bn254([a, b])
}
