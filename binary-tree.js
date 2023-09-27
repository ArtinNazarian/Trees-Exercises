/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (this.root === null) {
      return 0;
    }
    let queue = [this.root];
    let minHeight = 1;

    while (queue.length) {
      let levelSize = queue.length;
      while (levelSize) {
        let current = queue.shift();
        if (current.left === null && current.right === null) {
          return minHeight;
        } else {
          if (current.left) {
            queue.push(current.left);
          }
          if (current.right) {
            queue.push(current.right);
          }
        }
        levelSize--;
      }
      minHeight++;
    }
    return minHeight;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    if (this.root === null) {
      return 0;
    }
    let queue = [this.root];
    let maxHeight = 0;
    while (queue.length) {
      let len = queue.length;
      for (let i = 0; i < len; i++) {
        let current = queue.shift();
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
      maxHeight++;
    }
    return maxHeight;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let max = 0;
    function dfs(root) {
      if (!root) return 0;

      let left = Math.max(0, dfs(root.left));
      let right = Math.max(0, dfs(root.right));
      let curMax = left + root.val + right;

      max = Math.max(curMax, max);
      return root.val + Math.max(left, right);
    }
    dfs(this.root);
    return max;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (this.root === null) return null;

    let queue = [this.root];
    let closest = null;
    while (queue.length) {
      let currentNode = queue.shift();
      let currentVal = currentNode.val;

      let nextGreater = currentVal > lowerBound;
      let reassign = currentVal < closest || closest === null;

      if (nextGreater && reassign) {
        closest = currentVal;
      }

      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    return closest;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (this.root === node1 || this.root === node2) return false;

    function findLevel(
      nodeToFind,
      currentNode,
      level = 0,
      data = { level: 0, parent: null }
    ) {
      if (data.parent) return data;
      if (currentNode.left === nodeToFind || currentNode.right === nodeToFind) {
        data.level = level + 1;
        data.parent = currentNode;
      }

      if (currentNode.left) {
        findLevel(nodeToFind, currentNode.left, level + 1, data);
      }

      if (currentNode.right) {
        findLevel(nodeToFind, currentNode.right, level + 1, data);
      }
      return data;
    }

    let node1Info = findLevel(node1, this.root);
    let node2Info = findLevel(node2, this.root);

    let sameLevel =
      node1Info && node2Info && node1Info.level === node2Info.level;
    let differentParents =
      node1Info && node2Info && node1Info.parent !== node2Info.parent;
    return sameLevel && differentParents;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize() {}

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize() {}

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
