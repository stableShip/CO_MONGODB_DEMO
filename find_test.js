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
        name: {type:String,index:true}
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

    it("findAndModify", function (done) {
        co(function* () {
            var user = new User();
            user.name = "JIE"
            yield user.save();
            user = yield User.findAndModify({name: "JIE"});
            user.should.have.property("name", "JIE");
            done();
        });
    })



})
