const { expect } = require("chai");
const { ethers } = require("hardhat");

const setup = async () => {
  const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  const Voex = await ethers.getContractFactory('ATATONFT');
  const voex = await Voex.deploy();
  return {voex, owner, addr1, addr2};
};

describe('ATATO', async () =>{
  let voex, owner, addr1, addr2;
  before( async () => {
    ({voex, owner, addr1, addr2} =  await setup());
  });
  describe ('ATATO TEST', async ()=> {

    // it('voex setBaseUri', async ()=> {
    //   await voex.baseTokenURI().then((res) => {
    //     console.log('------------', res);
    //   });
    //   await voex.connect(owner).setbaseURI("https://blockplays.s3.ap-south-1.amazonaws.com/Metadata/1-501/");
    //   await voex.baseTokenURI().then((res) => {
    //     console.log('------------', res);
    //   });
    //   await voex.connect(addr1).mint(1000000);
    //   await voex.balanceOf(addr1.address).then((res) => {
    //     expect(res).to.eq(1);
    //     console.log('111111111', res);
    //   });
    //   await voex.balanceOf(addr2.address).then((res) => {
    //     expect(res).to.eq(0);
    //     console.log('111111111', res);
    //   });
    //   await voex.prices(1).then((res) => {
    //     expect(res.toString()).to.eq("1000000");
    //     console.log('111111111', res);
    //   });
    // });
    it("atato mint", async ()=> {
      await expect(voex.connect(owner).mint("https://blockplays.s3.ap-south-1.amazonaws.com/Metadata"))
            .emit(voex, "LogMint").withArgs(owner.address,"https://blockplays.s3.ap-south-1.amazonaws.com/Metadata")
      await voex.tokenURI(1).then((res) =>{
            console.log(res);
      })
    })
    it("atato burn", async () => {
      // await voex.connect(addr2).burn(1);
      await expect(voex.connect(addr2).burn(1))
            .to.be.revertedWith("Invalid NFT Owner");
      // await expect(voex.connect(addr1).burn(1))
      //       .emit(voex,"LogBurn").withArgs(addr1.address,1);
    });

  });
});