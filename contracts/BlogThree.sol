// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlogThree {
    string public name;
    address public owner;

    using Counters for Counters.Counter;
    Counters.Counter private _postIds;

    struct Post {
        uint id;
        string title;
        string content;
        bool published;
    }

    // mappings are like hash tables
    // lookups for posts by id and ipfs hash
    mapping(uint => Post) private idToPost;
    mapping(string => Post) private hashToPost;

    // events establish a communication btw contracts & their UIs
    // ie. we can create listeners in client and also use them in The Graph
    event PostCreated(uint id, string title, string hash);
    event PostUpdated (uint id, string title, string hash, bool published);

    // while deployment, give author a name
    // creator as the owner of blog contract
    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }

    // Update the blog name
    function updateName(string memory _name) public {
        name = _name;
    }

    // transfer ownership of the contract to another address
    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }

    // fetch an individual post using hashId
    function fetchPost(string memory hash) public view returns(Post memory) {
        return hashToPost[hash];
    }

    // create new post
    function createPost(string memory title, string memory hash) public onlyOwner {
        _postIds.increment();
        uint postId = _postIds.current();
        Post storage post = idToPost[postId];
        post.id = postId;
        post.title = title;
        post.published = true;
        post.content = hash;
        hashToPost[hash] = post;
        emit PostCreated(postId, title, hash);
    }

    function updatePost(uint256 postId, string memory title, string memory hash, bool published) public onlyOwner {
        Post storage post = idToPost[postId];
        post.title = title;
        post.published = published;
        post.content = hash;
        idToPost[postId] = post;
        hashToPost[hash] = post;
        emit PostUpdated(postId, title, hash, published);
    }

    function fetchPosts() public view returns (Post[] memory) {
        uint postsCount = _postIds.current();
        
        Post[] memory posts = new Post[](postsCount);
        for(uint256 i = 0; i < postsCount; i++) {
            uint currentId = i + 1;
            Post storage currentPost = idToPost[currentId];
            posts[i] = currentPost;
        }
        return posts;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
}