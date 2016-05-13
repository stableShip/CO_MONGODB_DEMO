'use strict'
var mongoose = require("mongoose");
var co = require("co");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var should = require("should");


var arrSchema = new Schema({
    StringArr: [{type: String}],
    NumArr: [{type: Number}]
});

describe("Schema_Mixed", function () {
    mongoose.connect('mongodb://localhost/test');
    var Arr = mongoose.model('arr', arrSchema);
    before(function (done) {
        co(function* () {
            yield Arr.remove({});
            done();
        })
    })

    it("save", function (done) {
        co(function* () {
            var arr = new Arr();
            arr.StringArr = [1, 2, 3]
            yield arr.save();
            arr = yield Arr.findOne({"StringArr": 1});
            arr.StringArr.should.have.property(1);
            done();
        })
            .catch(function (err) {
                console.log(err)
            });
    })


    it.only("create", function (done) {
        co(function* () {
            yield Arr.create({
                    StringArr: [1, 2, 3]
                },
                {
                    StringArr: [1, 2]
                },
                {
                    StringArr: [1]
                },
                {
                    StringArr: [1, 2, 3, 4]
                }
            )
            var arrs = yield Arr.find({"StringArr": 1})
            arrs.should.be.an.Array
            done();
        })
        .catch(function (err) {
            console.log(err)
        });
    })

    it.only("sort", function (done) {
        co(function* () {
            var arr = new Arr();
            arr.StringArr = [1, 2, 3]
            yield arr.save();
            arr = yield Arr.findOne({"StringArr": 1});
            arr.StringArr.should.have.property(1);
            done();
        })
            .catch(function (err) {
                console.log(err)
            });
    })

})
