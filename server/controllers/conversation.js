const conversation = require('../models/conversation');
const User = require('../models/user');

exports.createConvo = async (req, res, next) => {
    const user1 = req.body.user1;
    const user2 = req.body.user2;
    const convo = new conversation({
        user1: user1,
        user2: user2
    })
    try {
        const conv = await convo.save();
        const arr = [user1, user2];
        const upConv = await Promise.all(
            arr.map(async id => {
                const usr = await User.findById(id)
                if (usr.contacts.includes(conv._id)) {

                    return usr;
                }

                return User.findByIdAndUpdate(id, {
                    "$push": { contacts: conv._id }
                })
            })
        )
        console.log(upConv)
        res.status(200).json({
            converstaion: conv,
            message: "created conversation!"
        })
    }

    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getConversations = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId);
        const convs = await Promise.all(
            user.contacts.map(id => {
                return conversation.findById(id);
            })
        )

        console.log(52,user,"getCOnvo",convs)
        const contacts = await Promise.all(
            convs.map(async e => {  
              
                if (e.user1!=userId) {
                    let c = await User.findById(e.user1)
                    console.log(e)
                    let data ={
                        convoId: e._id,
                        _id: c._id,
                        imageUrl : c.imageUrl,
                        name:c.name
                    }
                    return data
                }
                else {
                    let c = await User.findById(e.user2)
                    let data ={
                        convoId: e._id,
                        userId: c._id,
                        imageUrl : c.imageUrl,
                        name:c.name
                    }
                    return data
                }
            })
        )






        res.status(200).json({
            conversation: contacts,
            message: "Success"
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

