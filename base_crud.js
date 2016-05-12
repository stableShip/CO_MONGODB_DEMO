'use strict'
var mongoose = require("mongoose");
var co = require("co");
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var should = require("should");
var _ = require("lodash");
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
            } catch (err) {
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
                user.name = "test";
                yield user.save()
                user = yield User.findOne({name: "JIE"});
                (null === user).should.be.true;
                user = yield User.findOne({name: "test"});
                user.name.should.exactly("test")
                done();
            } catch (err) {
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
            } catch (err) {
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
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("find in", function (done) {
        co(function* () {
            try {
                yield User.create({
                    role: {
                        name: "1"
                    }
                }, {
                    role: {
                        name: "2"
                    }
                }, {
                    role: {
                        name: "3"
                    }
                }, {
                    role: {
                        name: "4"
                    }
                }, {
                    role: {
                        name: "5"
                    }
                }, {
                    role: {
                        name: "6"
                    }
                }, {
                    role: {
                        name: "1"
                    }
                }, {
                    role: {
                        name: "1"
                    }
                }, {
                    role: {
                        name: "1"
                    }
                })
                var users = yield User.find({"role.name": {$in: [1, 2, 3]}}).skip(2).limit(2);
                console.log(users)
                users.should.be.an.Array;
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("sort", function (done) {
        co(function* () {
            try {
                yield User.create({name: 1}, {name: 2}, {name: 3}, {name: 1}, {name: 5}, {name: 6}, {name: 1})
                var user = yield User.findOne({name: 1}).sort({_id: -1});
                user.name.should.exactly("1")
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })


    it("find select", function (done) {
        co(function* () {
            try {
                yield User.create({
                    name: "JIE",
                    role: {
                        name: "1"
                    },
                    gender: "1"
                })
                var users = yield User.find({"name": "JIE"}).select({name: 1}).skip(0).limit(2);
                console.log(users)
                users.should.be.an.Array;
                done();
            } catch (err) {
                console.log(err);
            }
        });
    })
})
