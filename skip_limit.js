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
        name: {type: String, index: true}
    },
    crtTime: {type: Date, default: new Date()}

});


describe("Skip_Limit", function () {
    mongoose.connect('mongodb://localhost/test');
    var User = mongoose.model('user', userSchema);
    before(function (done) {
        co(function* () {
            try {
                yield User.remove({});
                done();
            } catch (err) {
                console.log(err);
            }
        })
    })

    it("limit value 0 should return all user", function (done) {
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
                        name: "7"
                    }
                }, {
                    role: {
                        name: "8"
                    }
                }, {
                    role: {
                        name: "9"
                    }
                })
                var users = yield User.find({"role.name": {$in: [1, 2, 3, 4, 5, 6, 7, 8, 9]}}).skip(0).limit(0)
                users.should.be.an.Array;
                users.length.should.be.eql(9);
                done();
            } catch (err) {
                console.log(err);
            }
        });


    })
});
