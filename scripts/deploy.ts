// import hre = require("hardhat");
import { ethers } from "hardhat";
import fs from "fs";

async function main() {
  const Blog = await ethers.getContractFactory("BlogThree");
  const blog = await Blog.deploy();
  await blog.deployed();

  fs.writeFileSync("./config.js", `
    export const contractAddress = "${blog.address}"
    export const ownerAddress = "${await blog.signer.getAddress()}"
  `)

  console.log("Blog contrct deployed at", blog.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
