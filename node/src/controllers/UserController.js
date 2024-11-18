const db = require('../../models');
const admin = require('../../config/firebase')
const { generateToken } = require('../utils/jwt');

const loginWithGoogle = async (token) => {
    try{
        const decodedToken = await admin.auth().verifyIdToken(token);
        const { uid, name, email, picture } = decodedToken;

        console.log(uid, name, email);

        let user = await db.Usuario.findOne({ where: { uuid:uid }})

        if(!user){
            user = await db.Usuario.create({
                uuid: uid,
                nombres: name,
                correo: email,
                avatarURL: picture
            })
        }

        const jwtToken = generateToken(user);

        return { user: user, token: jwtToken };
    }catch(error){
        throw error;
    }
}

module.exports = { loginWithGoogle };