const SHA256 = require('crypto-js/sha256');
// class for block
class Block {

  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
// method to calculate the HASH value
  calculateHash(){
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}

// new class for BLOCKCHAIN

class Blockchain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "12/04/2023", "Genesis block", "0");
    }

    //returns the latest block in the chain
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    //add new block to the chain
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash; //return hash of the latest block
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }  

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (previousBlock.hash !== currentBlock.previousHash) {
                return false;
              }

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.calculateHash()){
                return false;
            }
        
        }

        return true;
    }
}

let savjeeCoin = new Blockchain();
savjeeCoin.addBlock(new Block(1, "13/04/2023", { amount: 100}));
savjeeCoin.addBlock(new Block(2, "13/04/2023", { amount: 200}));

console.log(JSON.stringify(savjeeCoin, null, 4));
console.log('Is blockchain valid?' + savjeeCoin.isChainValid());

savjeeCoin.chain[1].data = { amount: 500 }; //tampering data
console.log('Is blockchain valid?' + savjeeCoin.isChainValid());
savjeeCoin.chain[1].hash = savjeeCoin.chain[1].calculateHash(); //tampering hash value

console.log('Is blockchain valid?' + savjeeCoin.isChainValid());
