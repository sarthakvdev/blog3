import * as fs from "fs";
import { ethers } from "hardhat";

async function main() {
  // deplot the contract on the network
  const Blog = await ethers.getContractFactory("BlogThree");
  const blog = await Blog.deploy("Lightbing Blog");

  await blog.deployed();

  console.log("Blog contrct deployed at", blog.address);

  fs.writeFileSync(
    "./config.js",
    `export const contractAddress = "${
      blog.address
    }"\nexport const ownerAddress = "${await blog.signer.getAddress()}"`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("error --- \n", error);
    process.exit(1);
  });
