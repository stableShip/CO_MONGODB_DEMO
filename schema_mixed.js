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

    it("create", function (done) {
        co(function* () {
            var mixed = new Mixed();
            mixed.data = {name: "JIE"}
            mixed.markModified("data")
            yield mixed.save();
            mixed = yield Mixed.findOne({"data.name": "JIE"});
            mixed.data.should.have.property("name", "JIE");
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


    it.only("update", function (done) {
        co(function* () {
            try {
                var mixed = new Mixed();
                mixed.data = {name: "JIE"};
                mixed.markModified("data");
                yield mixed.save();
                mixed = yield Mixed.findOne({"data.name": "JIE"});
                console.log(mixed,111);
                mixed.date = {"gender": 1};
                //mixed.data.gender = 1;
                mixed.markModified("data");
                mixed.markModified("data.name");
                mixed.markModified("data.gender");
                yield mixed.save();
                //mixed = yield Mixed.findOne({"data.name": "JIE"});
                //console.log(mixed);
                //mixed.should.be.true;
                //mixed = yield Mixed.findOne({"data.name": "test"});
                //mixed.name.should.exactly("test")
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })

})
