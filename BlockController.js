const SHA256 = require('crypto-js/sha256');
const BlockClass = require('./Block.js');

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * Implement a GET Endpoint to retrieve a block by index, url: "/api/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", (req, res) => {
            // Add your code here
            if (!req.params) return res.sendStatus(400)
            //let block = this.blocks[req.params.index];
            //res.send('you get a block:\n' + JSON.stringify(block));
            if(req.params.index >= this.blocks.length) return res.send("The height is out of bounds!")
            for (let index = 0; index < this.blocks.length; index++) {
                if(this.blocks[index].height == req.params.index){
                    res.send('you get a block:\n' + JSON.stringify(this.blocks[index]));
                    break;
                }
            }
        });
    }

    /**
     * Implement a POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/block", (req, res) => {
            // Add your code here
            if (!req.body) return res.sendStatus(400)
            if(!req.body.body) return res.send("The body cannot be empty!")
            let data = req.body.body;
            let blockAux = new BlockClass.Block(data);
            blockAux.height = this.blocks.length;
            blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
            this.blocks.push(blockAux);
            
            res.send('you post a block:\n' + JSON.stringify(this.blocks[this.blocks.length-1]));
        });
    }

    /**
     * Help method to inizialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}