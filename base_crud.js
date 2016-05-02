'use strict'
var mongoose = require("mongoose");
var co = require("co");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var should = require("should");

var userSchema = new Schema({
    name: String,
    gender: String,
    age: Number,
    birthday: Date,
    role: {
        name: String,
    },
    crtTime: {type: Date, default: new Date()}
});

describe("base_crud", function () {
    mongoose.connect('mongodb://localhost/test');
    var User = mongoose.model('user', userSchema);
    before(function (done) {
        co(function* () {
            yield User.remove({});
            done();
        })
    })

    it("create", function (done) {
        co(function* () {
            var user = new User();
            user.name = "JIE"
            yield user.save();
            user = yield User.findOne({name: "JIE"});
            user.should.have.property("name", "JIE");
            done();
        });
    })

    it("remove", function (done) {
        co(function* () {
            try {
                var user = new User();
                user.name = "JIE"
                yield user.save();
                user = yield User.findOne({name: "JIE"});
                user.should.have.property("name", "JIE");
                yield User.remove({name: "JIE"});
                user = yield User.findOne({name: "JIE"});
                (user === null).should.be.true;
                done();
            }catch (err){
                console.log(err);
            }
        });
    })


    it("update", function (done) {
        co(function* () {
            try {
                var user = new User();
                user.name = "JIE"
                yield user.save();
                user = yield User.findOne({name: "JIE"});
                user.name="test";
                yield user.save()
                user = yield User.findOne({name: "JIE"});
                (null === user).should.be.true;
                user = yield User.findOne({name: "test"});
                user.name.should.exactly("test")
                done();
            }catch (err){
                console.log(err);
            }
        });
    })


    it("find", function (done) {
        co(function* () {
            try {
                var user = new User();
                user.name = "JIE"
                yield user.save();
                user = yield User.find({name: "JIE"});
                user.should.be.an.ARRAY;
                user[0].name.should.exactly("JIE")
                done();
            }catch (err){
                console.log(err);
            }
        });
    })


    it("findOne", function (done) {
        co(function* () {
            try {
                var user = new User();
                user.name = "JIE"
                yield user.save();
                user = yield User.findOne({name: "JIE"});
                user.name.should.exactly("JIE")
                done();
            }catch (err){
                console.log(err);
            }
        });
    })
})
