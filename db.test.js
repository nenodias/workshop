const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const faker = require("@faker-js/faker");
const { findOne, findAll, deleteOne, insert, update } = require("./db");

function createCustomer(nome, idade, uf){
    return { nome, idade, uf };
}

function createConnection(error, docs){
    global.conn = {
        collection:function(){
        }
    };
    const stub = sinon.stub(global.conn, "collection").returns({
        find:function(filters){
            return { toArray: function(callback){
                callback(error, docs);
            }}
        }
    });
    return stub;
}


describe("db", function () {
    describe("findAll", function() {
        it("should retrieve as empty array", async function() {
            const error = undefined;
            const docs = [];
            createConnection(error, docs);

            findAll((e, docs) => {
                expect(e).to.be.undefined;
                expect(docs).to.be.an('array').empty;
            })
        });

        it("should retrieve an error", async function() {
            const error = new Error("Error on retriving record");
            const docs = undefined;
            createConnection(error, docs);

            findAll((e, docs) => {
                expect(e).to.be.not.undefined;
                expect(docs).to.be.undefined;
            })
        });

        it("should retrieve a record", async function() {
            const error = undefined;
            const doc = createCustomer("José", 20, "SP");
            const docs = [doc];
            createConnection(error, docs);

            findAll((e, docs) => {
                expect(e).to.be.undefined;
                expect(docs).to.be.an('array').that.contains(doc);
                expect(docs[0].nome).to.be.equal("José");
                expect(docs[0].idade).to.be.equal(20);
                expect(docs[0].uf).to.be.equal("SP");
                expect(Object.keys(docs[0])).to.be.an("array").length(3);
            })
        });
    });
});