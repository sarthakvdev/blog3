const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe, it } = require("mocha");

describe("Blog", async function() {
  it("Should create a post", async function() {
    const Blog = await ethers.getContractFactory("BlogThree");
    const blog = await Blog.deploy("Sarthak Blog3");
    await blog.deployed();
    await blog.createPost("My first Post", "Random content for Hash");

    const posts = await blog.fetchPosts();
    console.log("post", posts[0]);
    expect(posts[0].title).to.equal("My first Post");
  });

  it("Should update a post", async function() {
    const Blog = await ethers.getContractFactory("BlogThree");
    const blog = await Blog.deploy("Sarthak Blog3");
    await blog.deployed();
    await blog.createPost("My second Post", "again Random content for Hash");

    await blog.updatePost(
      1,
      "Sarthak Blog updated",
      "Fixed again random content for hash",
      true
    );

    const posts = await blog.fetchPosts();
    expect(posts[0].title).to.equal("Sarthak Blog updated");
  });

  it("Should update post's name", async function() {
    const Blog = await ethers.getContractFactory("BlogThree");
    const blog = await Blog.deploy("Sarthak Blog3");
    await blog.deployed();

    expect(await blog.name()).to.equal("Sarthak Blog3");
    await blog.updateName("Sarthak's Blog3");
    expect(await blog.name()).to.equal("Sarthak's Blog3");
  });
});

export {};