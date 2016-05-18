'use strict'
var mongoose = require("mongoose");
var co = require("co");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var should = require("should");


var mixedSchema = new Schema({
    data: {type: Schema.Types.Mixed}
});

describe("Schema_Mixed", function () {
    mongoose.connect('mongodb://localhost/test');
    var Mixed = mongoose.model('mixed', mixedSchema);
    before(function (done) {
        co(function* () {
            yield Mixed.remove({});
            done();
        })
    })

    it("create Object", function (done) {
        co(function* () {
            var mixed = new Mixed();
            mixed.data = {name: "JIE"}
            yield mixed.save();
            mixed = yield Mixed.findOne({"data.name": "JIE"});
            mixed.data.should.have.property("name", "JIE");
            done();
        })
            .catch(function (err) {
                console.log(err)
            });
    })


    it("create String", function (done) {
        co(function* () {
            var mixed = new Mixed();
            mixed.data = "test"
            yield mixed.save();
            mixed = yield Mixed.findOne({"data": "test"});
            mixed.should.have.property("data", "test");
            done();
        })
            .catch(function (err) {
                console.log(err)
            });
    })


    it("remove", function (done) {
        co(function* () {
            try {
                var mixed = new Mixed();
                mixed.data = {name: "JIE"}
                mixed.markModified("data")
                yield mixed.save();
                yield Mixed.remove({"data.name": "JIE"});
                mixed = yield Mixed.findOne({"data.name": "JIE"});
                (mixed === null).should.be.true;
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("update", function (done) {
        co(function* () {
            try {
                var mixed = new Mixed();
                mixed.data = {name: "JIE"};
                //mixed.markModified("data"); // 不需要了，也可以正常保存数据
                yield mixed.save();
                mixed = yield Mixed.findOne({"data.name": "JIE"});
                mixed.data = {"gender": 1};
                //mixed.markModified("data");　
                yield mixed.save();
                mixed = yield Mixed.findOne({"data.name": "JIE"});
                (!mixed).should.be.true;
                mixed = yield Mixed.findOne({"data.gender": 1});
                mixed.data.gender.should.exactly(1)
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("find", function (done) {
        co(function* () {
            try {
                var mixed = new Mixed();
                mixed.data = {name: "JIE"};
                yield mixed.save();
                mixed = yield Mixed.find({"data.name": "JIE"});
                mixed.should.be.an.ARRAY;
                console.log(mixed)
                mixed[0].data.name.should.exactly("JIE")
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("findOne", function (done) {
        co(function* () {
            try {
                var mixed = new Mixed();
                mixed.data = {name: "JIE"};
                yield mixed.save();
                mixed = yield Mixed.findOne({"data.name": "JIE"});
                mixed.data.name.should.exactly("JIE")
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("findOneAndUpdate", function (done) {
        co(function* () {
            try {
                var mixed = new Mixed();
                mixed.data = {name: "JIE"};
                yield mixed.save();
                mixed = yield Mixed.findOneAndUpdate({"data.name": "JIE"}, {"data.name": "test"}, {new: true});
                mixed.data.name.should.exactly("test")
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })

})
