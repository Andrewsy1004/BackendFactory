import jwt from 'jsonwebtoken'

export const GenerateToken = (uid,rol) => {
    return new Promise ((resolve, reject) => {
        const payload = {uid,rol}
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err)
                reject('It was not possible to generate the token')
            }
            resolve(token)
        })
    })
}